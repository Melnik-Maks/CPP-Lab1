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
import { PackagingStrategy } from './contracts/packaging-strategy.interface';
import { GiftOrderItem } from './models/gift-order-item';
import { GiftProductData } from './models/gift-product-data';
import { provideGiftShop } from './gift-shop.providers';
import { GiftCatalogService } from './services/gift-catalog.service';
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

  dataUrl = 'assets/gift-products.json';
  products: GiftProduct[] = [];
  packagingOptions: PackagingStrategy[] = [];
  selectedPackaging: Record<string, string> = {};
  orderItems: GiftOrderItem[] = [];
  statusText = 'Завантажте товари та сформуйте власний список подарунків.';

  constructor(
    private readonly catalogService: GiftCatalogService,
    private readonly packagingService: GiftPackagingService,
    private readonly orderService: GiftOrderService,
    private readonly productFactory: GiftProductFactoryService
  ) {
    this.packagingOptions = this.packagingService.getAvailableStrategies();
  }

  async loadProducts(): Promise<void> {
    try {
      this.products = await this.catalogService.loadCatalog(this.dataUrl);
      this.orderItems = [];
      this.selectedPackaging = {};

      const defaultPackagingCode = this.packagingOptions[0]?.code ?? '';

      for (const product of this.products) {
        this.selectedPackaging[product.id] = defaultPackagingCode;
      }

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

  addProduct(data: GiftProductData): void {
    if (this.products.some((product) => product.id === data.id)) {
      this.statusText = `Помилка: товар із кодом "${data.id}" уже існує.`;
      return;
    }

    try {
      const product = this.productFactory.createProduct(data);
      const defaultPackagingCode = this.packagingOptions[0]?.code ?? '';
      const isMaxPriceProduct =
        this.products.length === 0 ||
        product.basePrice >= Math.max(...this.products.map((item) => item.basePrice));

      this.products = [...this.products, product];
      this.selectedPackaging = {
        ...this.selectedPackaging,
        [product.id]: defaultPackagingCode
      };
      this.statusText = isMaxPriceProduct
        ? `Додано новий товар "${product.title}". Він має максимальну ціну.`
        : `Додано новий товар "${product.title}".`;
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
    }
  }

  updateProduct(data: GiftProductData): void {
    try {
      const product = this.productFactory.createProduct(data);
      this.products = this.products.map((item) => (item.id === product.id ? product : item));
      this.statusText = `Оновлено дані товару "${product.title}".`;
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
    }
  }

  deleteProduct(productId: string): void {
    this.products = this.products.filter((product) => product.id !== productId);
    this.orderItems = this.orderItems.filter((item) => item.productId !== productId);

    const { [productId]: _removedPackaging, ...selectedPackaging } = this.selectedPackaging;
    this.selectedPackaging = selectedPackaging;
    this.statusText = 'Товар видалено з каталогу та сформованого списку.';
  }

  removeFromOrder(lineId: string): void {
    this.orderItems = this.orderItems.filter((item) => item.lineId !== lineId);
    this.statusText = 'Позицію видалено зі сформованого списку.';
  }

  getTotalPrice(): number {
    return this.orderService.calculateTotal(this.orderItems);
  }

  formatPrice(value: number): string {
    return `${value.toFixed(2)} грн`;
  }

  isMaxPriceProduct(product: GiftProduct): boolean {
    const maxPrice = Math.max(...this.products.map((item) => item.basePrice));
    return product.basePrice === maxPrice;
  }
}
