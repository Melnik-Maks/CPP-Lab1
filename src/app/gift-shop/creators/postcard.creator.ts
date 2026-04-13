import { Injectable } from '@angular/core';
import { GiftProductCreator } from '../contracts/gift-product-creator.interface';
import { GiftProductData } from '../models/gift-product-data';
import { Postcard } from '../models/postcard';

@Injectable()
export class PostcardCreator implements GiftProductCreator {
  readonly supportedType = 'postcard';

  create(data: GiftProductData): Postcard {
    return new Postcard(
      data.id,
      data.title,
      data.basePrice,
      data.occasion ?? '',
      data.message ?? ''
    );
  }
}
