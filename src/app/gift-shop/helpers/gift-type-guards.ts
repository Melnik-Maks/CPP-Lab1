import { Fragile } from '../contracts/fragile.interface';
import { GiftProduct } from '../contracts/gift-product.interface';
import { Personalizable } from '../contracts/personalizable.interface';

export function isFragileProduct(product: GiftProduct): product is GiftProduct & Fragile {
  return 'requiresProtection' in product;
}

export function isPersonalizableProduct(
  product: GiftProduct
): product is GiftProduct & Personalizable {
  return 'getPersonalMessage' in product;
}
