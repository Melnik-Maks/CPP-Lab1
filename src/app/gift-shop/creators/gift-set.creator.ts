import { Injectable } from '@angular/core';
import { GiftProductCreator } from '../contracts/gift-product-creator.interface';
import { GiftProductData } from '../models/gift-product-data';
import { GiftSet } from '../models/gift-set';

@Injectable()
export class GiftSetCreator implements GiftProductCreator {
  readonly supportedType = 'giftSet';

  create(data: GiftProductData): GiftSet {
    return new GiftSet(
      data.id,
      data.title,
      data.basePrice,
      data.itemCount ?? 0,
      data.theme ?? ''
    );
  }
}
