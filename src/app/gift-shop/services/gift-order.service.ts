import { Injectable } from '@angular/core';
import { GiftProduct } from '../contracts/gift-product.interface';
import { GiftOrderItem } from '../models/gift-order-item';
import { GiftPackagingService } from './gift-packaging.service';

@Injectable()
export class GiftOrderService {
  private nextLineNumber = 1;

  constructor(private readonly packagingService: GiftPackagingService) {}

  createOrderItem(product: GiftProduct, packagingCode: string): GiftOrderItem {
    const packagedGift = this.packagingService.packageProduct(product, packagingCode);

    return {
      lineId: `line-${this.nextLineNumber++}`,
      productId: packagedGift.productId,
      title: packagedGift.productTitle,
      categoryLabel: product.categoryLabel,
      packagingTitle: packagedGift.packagingTitle,
      packagingPrice: packagedGift.packagingPrice,
      totalPrice: packagedGift.totalPrice,
      note: packagedGift.note
    };
  }

  calculateTotal(items: GiftOrderItem[]): number {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }
}
