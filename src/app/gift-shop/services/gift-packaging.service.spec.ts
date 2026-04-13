import { TestBed } from '@angular/core/testing';
import { provideGiftShop } from '../gift-shop.providers';
import { GiftSet } from '../models/gift-set';
import { Souvenir } from '../models/souvenir';
import { GiftPackagingService } from './gift-packaging.service';

describe('GiftPackagingService', () => {
  let service: GiftPackagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...provideGiftShop()]
    });

    service = TestBed.inject(GiftPackagingService);
  });

  it('має повертати доступні стратегії пакування', () => {
    expect(service.getAvailableStrategies().length).toBe(3);
  });

  it('має правильно пакувати звичайний товар', () => {
    const product = new GiftSet('1', 'Набір', 600, 3, 'солодощі');
    const packaged = service.packageProduct(product, 'classic');

    expect(packaged.packagingTitle).toBe('Класичне пакування');
    expect(packaged.totalPrice).toBe(640);
  });

  it('має додавати захисну надбавку для крихкого сувеніра', () => {
    const product = new Souvenir('2', 'Ваза', 300, 'скло', true);
    const packaged = service.packageProduct(product, 'premium');

    expect(packaged.packagingPrice).toBe(120);
    expect(packaged.note).toContain('крихкого товару');
  });
});
