import { Injectable } from '@angular/core';
import { GiftProduct } from '../contracts/gift-product.interface';
import { PackagingStrategy } from '../contracts/packaging-strategy.interface';
import { isFragileProduct } from '../helpers/gift-type-guards';
import { PackagedGift } from '../models/packaged-gift';

@Injectable()
export class EcoWrapStrategy implements PackagingStrategy {
  readonly code = 'eco';
  readonly title = 'Еко-пакування';
  readonly description = 'Крафтовий папір та природні матеріали для екологічного оформлення.';

  package(product: GiftProduct): PackagedGift {
    const extraProtection = isFragileProduct(product) && product.requiresProtection() ? 20 : 0;
    const packagingPrice = 30 + extraProtection;
    const note = extraProtection > 0
      ? 'Для крихкого товару додано захисний шар в еко-пакуванні.'
      : 'Еко-пакування без додаткових захисних елементів.';

    return {
      productId: product.id,
      productTitle: product.title,
      packagingCode: this.code,
      packagingTitle: this.title,
      packagingPrice,
      totalPrice: product.basePrice + packagingPrice,
      note
    };
  }
}
