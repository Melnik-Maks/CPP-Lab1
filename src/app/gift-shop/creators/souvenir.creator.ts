import { Injectable } from '@angular/core';
import { GiftProductCreator } from '../contracts/gift-product-creator.interface';
import { GiftProductData } from '../models/gift-product-data';
import { Souvenir } from '../models/souvenir';

@Injectable()
export class SouvenirCreator implements GiftProductCreator {
  readonly supportedType = 'souvenir';

  create(data: GiftProductData): Souvenir {
    return new Souvenir(
      data.id,
      data.title,
      data.basePrice,
      data.material ?? '',
      data.isFragile ?? false
    );
  }
}
