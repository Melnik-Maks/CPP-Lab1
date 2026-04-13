import { PackagedGift } from '../models/packaged-gift';
import { GiftProduct } from './gift-product.interface';

export interface PackagingStrategy {
  readonly code: string;
  readonly title: string;
  readonly description: string;

  package(product: GiftProduct): PackagedGift;
}
