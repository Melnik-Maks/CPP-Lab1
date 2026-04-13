import { TestBed } from '@angular/core/testing';
import { provideGiftShop } from '../gift-shop.providers';
import { GiftProductFactoryService } from './gift-product-factory.service';

describe('GiftProductFactoryService', () => {
  let service: GiftProductFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...provideGiftShop()]
    });

    service = TestBed.inject(GiftProductFactoryService);
  });

  it('має створювати товари всіх підтримуваних типів', () => {
    const giftSet = service.createProduct({
      id: '1',
      type: 'giftSet',
      title: 'Набір',
      basePrice: 700,
      itemCount: 3,
      theme: 'кава'
    });

    const postcard = service.createProduct({
      id: '2',
      type: 'postcard',
      title: 'Листівка',
      basePrice: 50,
      occasion: 'день народження',
      message: 'Вітаю'
    });

    const souvenir = service.createProduct({
      id: '3',
      type: 'souvenir',
      title: 'Сувенір',
      basePrice: 220,
      material: 'дерево',
      isFragile: false
    });

    const certificate = service.createProduct({
      id: '4',
      type: 'giftCertificate',
      title: 'Сертифікат',
      basePrice: 500,
      recipientName: 'Ірина',
      deliveryType: 'email'
    });

    expect(giftSet.type).toBe('giftSet');
    expect(postcard.type).toBe('postcard');
    expect(souvenir.type).toBe('souvenir');
    expect(certificate.type).toBe('giftCertificate');
  });

  it('має викидати помилку для невідомого типу товару', () => {
    expect(() =>
      service.createProduct({
        id: '5',
        type: 'unknown',
        title: 'Невідомий',
        basePrice: 100
      })
    ).toThrowError('Невідомий тип товару: unknown.');
  });
});
