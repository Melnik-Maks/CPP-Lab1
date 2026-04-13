export interface GiftProduct {
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly categoryLabel: string;
  readonly basePrice: number;

  getDetails(): string[];
}
