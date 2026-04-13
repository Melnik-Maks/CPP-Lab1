import { Inject, Injectable } from '@angular/core';
import { GiftProduct } from '../contracts/gift-product.interface';
import { PACKAGING_STRATEGIES } from '../gift-shop.tokens';
import { PackagedGift } from '../models/packaged-gift';
import { PackagingStrategy } from '../contracts/packaging-strategy.interface';

@Injectable()
export class GiftPackagingService {
  constructor(
    @Inject(PACKAGING_STRATEGIES)
    private readonly strategies: PackagingStrategy[]
  ) {}

  getAvailableStrategies(): PackagingStrategy[] {
    return this.strategies;
  }

  packageProduct(product: GiftProduct, packagingCode: string): PackagedGift {
    const strategy = this.strategies.find((item) => item.code === packagingCode);

    if (!strategy) {
      throw new Error(`Невідомий тип пакування: ${packagingCode}.`);
    }

    return strategy.package(product);
  }
}
