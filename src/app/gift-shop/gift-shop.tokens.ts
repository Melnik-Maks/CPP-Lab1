import { InjectionToken } from '@angular/core';
import { GiftDataSource } from './contracts/gift-data-source.interface';
import { GiftProductCreator } from './contracts/gift-product-creator.interface';
import { PackagingStrategy } from './contracts/packaging-strategy.interface';

export const GIFT_DATA_SOURCE = new InjectionToken<GiftDataSource>('GIFT_DATA_SOURCE');
export const GIFT_PRODUCT_CREATORS = new InjectionToken<GiftProductCreator[]>('GIFT_PRODUCT_CREATORS');
export const PACKAGING_STRATEGIES = new InjectionToken<PackagingStrategy[]>('PACKAGING_STRATEGIES');
