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
import { GiftProduct } from './contracts/gift-product.interface';
import { PackagingStrategy } from './contracts/packaging-strategy.interface';
import { GiftOrderItem } from './models/gift-order-item';
import { provideGiftShop } from './gift-shop.providers';
import { GiftCatalogService } from './services/gift-catalog.service';
import { GiftOrderService } from './services/gift-order.service';
import { GiftPackagingService } from './services/gift-packaging.service';

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
    private readonly orderService: GiftOrderService
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
}
