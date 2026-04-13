import { GiftProduct } from '../contracts/gift-product.interface';
import { Personalizable } from '../contracts/personalizable.interface';
import { BaseGiftProduct } from './base-gift-product';

export class Postcard extends BaseGiftProduct implements GiftProduct, Personalizable {
  constructor(
    id: string,
    title: string,
    basePrice: number,
    public readonly occasion: string,
    public readonly message: string
  ) {
    super(id, 'postcard', title, 'Листівка', basePrice);

    if (!occasion.trim()) {
      throw new Error('Подія для листівки не може бути порожньою.');
    }

    if (!message.trim()) {
      throw new Error('Текст листівки не може бути порожнім.');
    }
  }

  getDetails(): string[] {
    return [
      `Подія: ${this.occasion}`,
      `Текст: ${this.message}`
    ];
  }

  getPersonalMessage(): string {
    return this.message;
  }
}
