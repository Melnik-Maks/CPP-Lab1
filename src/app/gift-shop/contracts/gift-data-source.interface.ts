import { GiftProductData } from '../models/gift-product-data';

export interface GiftDataSource {
  loadProducts(path: string): Promise<GiftProductData[]>;
  saveProducts(path: string, products: GiftProductData[]): Promise<void>;
  addProduct(path: string, product: GiftProductData): Promise<void>;
  updateProduct(path: string, product: GiftProductData): Promise<void>;
  deleteProduct(path: string, productId: string): Promise<void>;
}
