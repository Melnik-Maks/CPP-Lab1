import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonBadge, IonButton } from '@ionic/angular/standalone';
import { GiftProduct } from '../../contracts/gift-product.interface';
import { GiftProductData } from '../../models/gift-product-data';
import { GiftProductFormComponent } from '../gift-product-form/gift-product-form.component';

@Component({
  selector: 'app-gift-product-manager',
  standalone: true,
  imports: [IonBadge, IonButton, GiftProductFormComponent],
  templateUrl: './gift-product-manager.component.html',
  styleUrls: ['./gift-product-manager.component.scss']
})
export class GiftProductManagerComponent {
  @Input() products: GiftProduct[] = [];
  @Input() allProducts: GiftProduct[] = [];

  @Output() productUpdated = new EventEmitter<GiftProductData>();
  @Output() productDeleted = new EventEmitter<string>();

  editingProductId: string | null = null;

  startEdit(productId: string): void {
    this.editingProductId = productId;
  }

  saveEdit(data: GiftProductData): void {
    this.productUpdated.emit(data);
    this.editingProductId = null;
  }

  cancelEdit(): void {
    this.editingProductId = null;
  }

  deleteProduct(productId: string): void {
    if (this.editingProductId === productId) {
      this.editingProductId = null;
    }

    this.productDeleted.emit(productId);
  }

  get productsForValidation(): GiftProduct[] {
    return this.allProducts.length ? this.allProducts : this.products;
  }
}
