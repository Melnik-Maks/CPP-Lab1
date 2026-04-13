export abstract class BaseGiftProduct {
  protected constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly title: string,
    public readonly categoryLabel: string,
    public readonly basePrice: number
  ) {
    if (!id.trim()) {
      throw new Error('Ідентифікатор товару не може бути порожнім.');
    }

    if (!title.trim()) {
      throw new Error('Назва товару не може бути порожньою.');
    }

    if (basePrice <= 0) {
      throw new Error('Базова ціна товару має бути більшою за 0.');
    }
  }
}
