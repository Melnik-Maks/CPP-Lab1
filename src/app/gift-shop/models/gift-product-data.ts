export interface GiftProductData {
  id: string;
  type: string;
  title: string;
  basePrice: number;
  itemCount?: number;
  theme?: string;
  occasion?: string;
  message?: string;
  material?: string;
  isFragile?: boolean;
  recipientName?: string;
  deliveryType?: string;
}
