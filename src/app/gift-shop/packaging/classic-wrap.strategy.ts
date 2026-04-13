import { Injectable } from '@angular/core';
import { GiftProduct } from '../contracts/gift-product.interface';
import { PackagingStrategy } from '../contracts/packaging-strategy.interface';
import { isPersonalizableProduct } from '../helpers/gift-type-guards';
import { PackagedGift } from '../models/packaged-gift';

@Injectable()
export class ClassicWrapStrategy implements PackagingStrategy {
  readonly code = 'classic';
  readonly title = 'Класичне пакування';
  readonly description = 'Акуратний паперовий пакунок для універсальних подарунків.';

  package(product: GiftProduct): PackagedGift {
    const packagingPrice = 40;
    const note = isPersonalizableProduct(product)
      ? `Додається персональне повідомлення: ${product.getPersonalMessage()}`
      : 'Універсальне святкове оформлення без додаткових побажань.';

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
