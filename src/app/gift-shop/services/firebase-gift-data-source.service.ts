import { Inject, Injectable, Optional } from '@angular/core';
import { Database, get, ref, remove, set } from '@angular/fire/database';
import { GiftDataSource } from '../contracts/gift-data-source.interface';
import { GiftProductData } from '../models/gift-product-data';

@Injectable()
export class FirebaseGiftDataSourceService implements GiftDataSource {
  constructor(
    @Optional()
    @Inject(Database)
    private readonly database: Database | null
  ) {}

  async loadProducts(path: string): Promise<GiftProductData[]> {
    const snapshot = await get(ref(this.getDatabase(), this.normalizePath(path)));
    const value = snapshot.val();

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.filter(Boolean) as GiftProductData[];
    }

    return Object.entries(value).map(([id, product]) => ({
      id,
      ...(product as Omit<GiftProductData, 'id'>)
    }));
  }

  async saveProducts(path: string, products: GiftProductData[]): Promise<void> {
    const data = products.reduce<Record<string, GiftProductData>>((accumulator, product) => {
      accumulator[product.id] = product;
      return accumulator;
    }, {});

    await set(ref(this.getDatabase(), this.normalizePath(path)), data);
  }

  async addProduct(path: string, product: GiftProductData): Promise<void> {
    await set(ref(this.getDatabase(), this.getProductPath(path, product.id)), product);
  }

  async updateProduct(path: string, product: GiftProductData): Promise<void> {
    await set(ref(this.getDatabase(), this.getProductPath(path, product.id)), product);
  }

  async deleteProduct(path: string, productId: string): Promise<void> {
    await remove(ref(this.getDatabase(), this.getProductPath(path, productId)));
  }

  private getDatabase(): Database {
    if (!this.database) {
      throw new Error('Firebase Realtime Database не підключено. Перевірте налаштування environment.firebase.');
    }

    return this.database;
  }

  private getProductPath(path: string, productId: string): string {
    return `${this.normalizePath(path)}/${productId}`;
  }

  private normalizePath(path: string): string {
    return path.trim().replace(/^\/+|\/+$/g, '') || 'gift-products';
  }
}
