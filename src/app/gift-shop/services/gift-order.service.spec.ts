import { TestBed } from '@angular/core/testing';
import { provideGiftShop } from '../gift-shop.providers';
import { Postcard } from '../models/postcard';
import { GiftOrderService } from './gift-order.service';

describe('GiftOrderService', () => {
  let service: GiftOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [...provideGiftShop()]
    });

    service = TestBed.inject(GiftOrderService);
  });

  it('має створювати позицію замовлення з пакуванням', () => {
    const product = new Postcard('1', 'Листівка', 70, 'свято', 'Щиро вітаю');
    const item = service.createOrderItem(product, 'classic');

    expect(item.lineId).toBe('line-1');
    expect(item.packagingTitle).toBe('Класичне пакування');
    expect(item.totalPrice).toBe(110);
  });

  it('має правильно обчислювати загальну суму замовлення', () => {
    const items = [
      {
        lineId: 'line-1',
        productId: '1',
        title: 'Товар 1',
        categoryLabel: 'Листівка',
        packagingTitle: 'Класичне пакування',
        packagingPrice: 40,
        totalPrice: 110,
        note: 'Примітка 1'
      },
      {
        lineId: 'line-2',
        productId: '2',
        title: 'Товар 2',
        categoryLabel: 'Сувенір',
        packagingTitle: 'Преміум-коробка',
        packagingPrice: 85,
        totalPrice: 385,
        note: 'Примітка 2'
      }
    ];

    expect(service.calculateTotal(items)).toBe(495);
  });
});
