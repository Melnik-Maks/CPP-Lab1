import { Injectable } from '@angular/core';
import { GiftDataSource } from '../contracts/gift-data-source.interface';
import { GiftProductData } from '../models/gift-product-data';

@Injectable()
export class LocalGiftJsonDataSourceService implements GiftDataSource {
  async loadProducts(url: string): Promise<GiftProductData[]> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Не вдалося завантажити дані. Код відповіді: ${response.status}.`);
    }

    const json = await response.json();
    const data = json.record ?? json;

    if (!Array.isArray(data)) {
      throw new Error('Отримані дані мають бути масивом товарів.');
    }

    return data as GiftProductData[];
  }
}
