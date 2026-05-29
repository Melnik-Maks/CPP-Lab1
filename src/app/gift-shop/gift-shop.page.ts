import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { MyHeaderComponent } from '../my-header/my-header.component';
import { GiftProductFormComponent } from './components/gift-product-form/gift-product-form.component';
import { GiftProductManagerComponent } from './components/gift-product-manager/gift-product-manager.component';
import { GiftProduct } from './contracts/gift-product.interface';
import { provideGiftShop } from './gift-shop.providers';
import { GiftOrderItem } from './models/gift-order-item';
import { GiftProductData } from './models/gift-product-data';
import { PackagingStrategy } from './contracts/packaging-strategy.interface';
import { GiftCatalogService } from './services/gift-catalog.service';
import { GiftCategoryFilterService, GiftCategoryType } from './services/gift-category-filter.service';
import { GiftOrderService } from './services/gift-order.service';
import { GiftPackagingService } from './services/gift-packaging.service';
import { GiftProductFactoryService } from './services/gift-product-factory.service';

@Component({
  selector: 'app-gift-shop',
  standalone: true,
  imports: [
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonInput,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    AsyncPipe,
    FormsModule,
    GiftProductFormComponent,
    GiftProductManagerComponent,
    MyHeaderComponent
  ],
  providers: [provideGiftShop()],
  templateUrl: './gift-shop.page.html',
  styleUrls: ['./gift-shop.page.scss']
})
export class GiftShopPage {
  fullName = 'Мельник Максим';
  group = 'КН-31';
  variant = 'Варіант 9';

  databasePath = 'gift-products';
  products: GiftProduct[] = [];
  readonly filteredProducts$;
  packagingOptions: PackagingStrategy[] = [];
  selectedCategories: GiftCategoryType[] = [];
  searchTerm = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedPackaging: Record<string, string> = {};
  orderItems: GiftOrderItem[] = [];
  statusText = 'Завантажте товари та сформуйте власний список подарунків.';

  readonly productCategories: Array<{ value: GiftCategoryType; label: string }> = [
    { value: 'giftSet', label: 'Подарункові набори' },
    { value: 'postcard', label: 'Листівки' },
    { value: 'souvenir', label: 'Сувеніри' },
    { value: 'giftCertificate', label: 'Подарункові сертифікати' }
  ];

  constructor(
    private readonly catalogService: GiftCatalogService,
    private readonly packagingService: GiftPackagingService,
    private readonly orderService: GiftOrderService,
    private readonly productFactory: GiftProductFactoryService,
    private readonly categoryFilterService: GiftCategoryFilterService
  ) {
    this.packagingOptions = this.packagingService.getAvailableStrategies();
    this.filteredProducts$ = this.categoryFilterService.filteredProducts$;
  }

  async loadProducts(): Promise<void> {
    try {
      this.products = await this.catalogService.loadCatalog(this.databasePath);
      this.orderItems = [];
      this.selectedPackaging = {};

      const defaultPackagingCode = this.packagingOptions[0]?.code ?? '';

      for (const product of this.products) {
        this.selectedPackaging[product.id] = defaultPackagingCode;
      }

      this.syncFilteredProducts();
      this.statusText = `Завантажено ${this.products.length} товарів магазину подарунків.`;
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
    }
  }

  addToOrder(product: GiftProduct): void {
    const packagingCode = this.selectedPackaging[product.id];

    try {
      const orderItem = this.orderService.createOrderItem(product, packagingCode);
      this.orderItems = [...this.orderItems, orderItem];
      this.statusText = `До списку додано товар "${product.title}".`;
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
    }
  }

  async saveCatalogToFirebase(): Promise<void> {
    try {
      await this.catalogService.saveProducts(
        this.databasePath,
        this.products.map((product) => this.toProductData(product))
      );
      this.statusText = `У Firebase збережено ${this.products.length} товарів.`;
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
    }
  }

  async addProduct(data: GiftProductData): Promise<void> {
    if (this.products.some((product) => product.id === data.id)) {
      this.statusText = `Помилка: товар із кодом "${data.id}" уже існує.`;
      return;
    }

    try {
      await this.catalogService.addProduct(this.databasePath, data);
      const product = this.productFactory.createProduct(data);
      const defaultPackagingCode = this.packagingOptions[0]?.code ?? '';

      this.products = [...this.products, product];
      this.selectedPackaging = {
        ...this.selectedPackaging,
        [product.id]: defaultPackagingCode
      };
      this.ensureCategoryVisible(product.type as GiftCategoryType);
      this.syncFilteredProducts();
      this.statusText = `Додано новий товар "${product.title}".`;
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
    }
  }

  async updateProduct(data: GiftProductData): Promise<void> {
    try {
      await this.catalogService.updateProduct(this.databasePath, data);
      const product = this.productFactory.createProduct(data);
      this.products = this.products.map((item) => (item.id === product.id ? product : item));
      this.ensureCategoryVisible(product.type as GiftCategoryType);
      this.syncFilteredProducts();
      this.statusText = `Оновлено дані товару "${product.title}".`;
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.catalogService.deleteProduct(this.databasePath, productId);
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
      return;
    }

    this.products = this.products.filter((product) => product.id !== productId);
    this.orderItems = this.orderItems.filter((item) => item.productId !== productId);

    const { [productId]: _removedPackaging, ...selectedPackaging } = this.selectedPackaging;
    this.selectedPackaging = selectedPackaging;
    this.syncFilteredProducts();
    this.statusText = 'Товар видалено з каталогу та сформованого списку.';
  }

  removeFromOrder(lineId: string): void {
    this.orderItems = this.orderItems.filter((item) => item.lineId !== lineId);
    this.statusText = 'Позицію видалено зі сформованого списку.';
  }

  changeCategories(categories: GiftCategoryType[] | GiftCategoryType | null): void {
    this.selectedCategories = Array.isArray(categories)
      ? categories
      : categories
        ? [categories]
        : [];
    this.categoryFilterService.setSelectedCategories(this.selectedCategories);
  }

  changeSearch(searchTerm: string): void {
    this.searchTerm = searchTerm ?? '';
    this.categoryFilterService.setSearchTerm(this.searchTerm);
  }

  changePriceFilter(): void {
    this.categoryFilterService.setPriceFilter({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.searchTerm = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.categoryFilterService.clearFilters();
  }

  getTotalPrice(): number {
    return this.orderService.calculateTotal(this.orderItems);
  }

  formatPrice(value: number): string {
    return `${value.toFixed(2)} грн`;
  }

  private ensureCategoryVisible(category: GiftCategoryType): void {
    if (this.selectedCategories.length === 0 || this.selectedCategories.includes(category)) {
      return;
    }

    this.selectedCategories = [...this.selectedCategories, category];
    this.categoryFilterService.setSelectedCategories(this.selectedCategories);
  }

  private syncFilteredProducts(): void {
    this.categoryFilterService.setProducts(this.products);
  }

  private toProductData(product: GiftProduct): GiftProductData {
    const source = product as any;
    const commonData = {
      id: product.id,
      type: product.type,
      title: product.title,
      basePrice: product.basePrice
    };

    if (product.type === 'giftSet') {
      return {
        ...commonData,
        itemCount: source.itemCount,
        itemNames: source.itemNames ?? [],
        theme: source.theme
      };
    }

    if (product.type === 'postcard') {
      return {
        ...commonData,
        occasion: source.occasion,
        message: source.message
      };
    }

    if (product.type === 'souvenir') {
      return {
        ...commonData,
        material: source.material,
        isFragile: source.isFragile
      };
    }

    return {
      ...commonData,
      recipientName: source.recipientName,
      deliveryType: source.deliveryType
    };
  }
}
