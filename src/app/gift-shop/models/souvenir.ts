import { Fragile } from '../contracts/fragile.interface';
import { GiftProduct } from '../contracts/gift-product.interface';
import { BaseGiftProduct } from './base-gift-product';

export class Souvenir extends BaseGiftProduct implements GiftProduct, Fragile {
  constructor(
    id: string,
    title: string,
    basePrice: number,
    public readonly material: string,
    public readonly isFragile: boolean
  ) {
    super(id, 'souvenir', title, 'Сувенір', basePrice);

    if (!material.trim()) {
      throw new Error('Матеріал сувеніра не може бути порожнім.');
    }
  }

  getDetails(): string[] {
    return [
      `Матеріал: ${this.material}`,
      `Крихкий товар: ${this.isFragile ? 'так' : 'ні'}`
    ];
  }

  requiresProtection(): boolean {
    return this.isFragile;
  }
}
