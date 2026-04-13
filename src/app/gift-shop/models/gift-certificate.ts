import { GiftProduct } from '../contracts/gift-product.interface';
import { Personalizable } from '../contracts/personalizable.interface';
import { BaseGiftProduct } from './base-gift-product';

export class GiftCertificate extends BaseGiftProduct implements GiftProduct, Personalizable {
  constructor(
    id: string,
    title: string,
    basePrice: number,
    public readonly recipientName: string,
    public readonly deliveryType: string
  ) {
    super(id, 'giftCertificate', title, 'Подарунковий сертифікат', basePrice);

    if (!recipientName.trim()) {
      throw new Error("Ім'я отримувача не може бути порожнім.");
    }

    if (!deliveryType.trim()) {
      throw new Error('Тип доставки сертифіката не може бути порожнім.');
    }
  }

  getDetails(): string[] {
    return [
      `Отримувач: ${this.recipientName}`,
      `Спосіб доставки: ${this.deliveryType}`
    ];
  }

  getPersonalMessage(): string {
    return `Сертифікат підготовлено для: ${this.recipientName}`;
  }
}
