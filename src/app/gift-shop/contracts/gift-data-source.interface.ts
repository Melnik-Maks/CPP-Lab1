import { GiftProductData } from '../models/gift-product-data';

export interface GiftDataSource {
  loadProducts(url: string): Promise<GiftProductData[]>;
}
