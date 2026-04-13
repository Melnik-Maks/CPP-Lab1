import { Inject, Injectable } from '@angular/core';
import { GiftDataSource } from '../contracts/gift-data-source.interface';
import { GiftProduct } from '../contracts/gift-product.interface';
import { GIFT_DATA_SOURCE } from '../gift-shop.tokens';
import { GiftProductFactoryService } from './gift-product-factory.service';

@Injectable()
export class GiftCatalogService {
  constructor(
    @Inject(GIFT_DATA_SOURCE)
    private readonly dataSource: GiftDataSource,
    private readonly productFactory: GiftProductFactoryService
  ) {}

  async loadCatalog(url: string): Promise<GiftProduct[]> {
    const rawProducts = await this.dataSource.loadProducts(url);
    return rawProducts.map((item) => this.productFactory.createProduct(item));
  }
}
