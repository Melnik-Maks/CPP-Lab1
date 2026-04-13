import { TestBed } from '@angular/core/testing';
import { GIFT_DATA_SOURCE } from '../gift-shop.tokens';
import { provideGiftShop } from '../gift-shop.providers';
import { GiftCatalogService } from './gift-catalog.service';

describe('GiftCatalogService', () => {
  let service: GiftCatalogService;
  let sourceSpy: jasmine.SpyObj<{ loadProducts: (url: string) => Promise<any[]> }>;

  beforeEach(() => {
    sourceSpy = jasmine.createSpyObj('GiftDataSource', ['loadProducts']);

    TestBed.configureTestingModule({
      providers: [
        ...provideGiftShop(),
        { provide: GIFT_DATA_SOURCE, useValue: sourceSpy }
      ]
    });

    service = TestBed.inject(GiftCatalogService);
  });

  it('має завантажувати каталог і перетворювати дані на обʼєкти', async () => {
    sourceSpy.loadProducts.and.resolveTo([
      {
        id: '1',
        type: 'giftSet',
        title: 'Набір',
        basePrice: 700,
        itemCount: 3,
        theme: 'чай'
      },
      {
        id: '2',
        type: 'giftCertificate',
        title: 'Сертифікат',
        basePrice: 500,
        recipientName: 'Олег',
        deliveryType: 'email'
      }
    ]);

    const products = await service.loadCatalog('assets/test.json');

    expect(sourceSpy.loadProducts).toHaveBeenCalledWith('assets/test.json');
    expect(products.length).toBe(2);
    expect(products[0].categoryLabel).toBe('Подарунковий набір');
    expect(products[1].categoryLabel).toBe('Подарунковий сертифікат');
  });
});
