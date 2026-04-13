import { Injectable } from '@angular/core';
import { GiftProduct } from '../contracts/gift-product.interface';
import { PackagingStrategy } from '../contracts/packaging-strategy.interface';
import { isFragileProduct } from '../helpers/gift-type-guards';
import { PackagedGift } from '../models/packaged-gift';

@Injectable()
export class PremiumBoxStrategy implements PackagingStrategy {
  readonly code = 'premium';
  readonly title = 'Преміум-коробка';
  readonly description = 'Жорстка подарункова коробка з декоративним наповнювачем.';

  package(product: GiftProduct): PackagedGift {
    const extraProtection = isFragileProduct(product) && product.requiresProtection() ? 35 : 0;
    const packagingPrice = 85 + extraProtection;
    const note = extraProtection > 0
      ? 'Преміум-коробка посилена для безпечного транспортування крихкого товару.'
      : 'Преміум-коробка підкреслює статусність подарунка.';

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
