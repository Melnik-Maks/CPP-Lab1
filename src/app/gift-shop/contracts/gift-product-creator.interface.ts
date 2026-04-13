import { GiftProductData } from '../models/gift-product-data';
import { GiftProduct } from './gift-product.interface';

export interface GiftProductCreator {
  readonly supportedType: string;
  create(data: GiftProductData): GiftProduct;
}
