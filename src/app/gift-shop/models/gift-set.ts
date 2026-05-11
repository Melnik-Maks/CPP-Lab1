import { GiftProduct } from '../contracts/gift-product.interface';
import { BaseGiftProduct } from './base-gift-product';

export class GiftSet extends BaseGiftProduct implements GiftProduct {
  constructor(
    id: string,
    title: string,
    basePrice: number,
    public readonly itemCount: number,
    public readonly theme: string,
    public readonly itemNames: string[] = []
  ) {
    super(id, 'giftSet', title, 'Подарунковий набір', basePrice);

    if (itemCount <= 0) {
      throw new Error('Кількість елементів у наборі має бути більшою за 0.');
    }

    if (!theme.trim()) {
      throw new Error('Тематика набору не може бути порожньою.');
    }
  }

  getDetails(): string[] {
    const details = [
      `Елементів у наборі: ${this.itemCount}`,
      `Тематика: ${this.theme}`
    ];

    if (this.itemNames.length) {
      details.push(`Склад набору: ${this.itemNames.join(', ')}`);
    }

    return details;
  }
}
