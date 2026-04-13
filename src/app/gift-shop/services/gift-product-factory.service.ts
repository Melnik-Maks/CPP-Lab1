import { Inject, Injectable } from '@angular/core';
import { GiftProductCreator } from '../contracts/gift-product-creator.interface';
import { GiftProduct } from '../contracts/gift-product.interface';
import { GIFT_PRODUCT_CREATORS } from '../gift-shop.tokens';
import { GiftProductData } from '../models/gift-product-data';

@Injectable()
export class GiftProductFactoryService {
  constructor(
    @Inject(GIFT_PRODUCT_CREATORS)
    private readonly creators: GiftProductCreator[]
  ) {}

  createProduct(data: GiftProductData): GiftProduct {
    const creator = this.creators.find((item) => item.supportedType === data.type);

    if (!creator) {
      throw new Error(`Невідомий тип товару: ${data.type}.`);
    }

    return creator.create(data);
  }
}
