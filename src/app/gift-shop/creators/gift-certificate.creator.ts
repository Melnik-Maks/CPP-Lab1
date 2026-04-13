import { Injectable } from '@angular/core';
import { GiftProductCreator } from '../contracts/gift-product-creator.interface';
import { GiftProductData } from '../models/gift-product-data';
import { GiftCertificate } from '../models/gift-certificate';

@Injectable()
export class GiftCertificateCreator implements GiftProductCreator {
  readonly supportedType = 'giftCertificate';

  create(data: GiftProductData): GiftCertificate {
    return new GiftCertificate(
      data.id,
      data.title,
      data.basePrice,
      data.recipientName ?? '',
      data.deliveryType ?? ''
    );
  }
}
