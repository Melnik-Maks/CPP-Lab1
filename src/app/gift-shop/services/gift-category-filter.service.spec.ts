import { GiftCategoryFilterService } from './gift-category-filter.service';
import { GiftCertificate } from '../models/gift-certificate';
import { GiftSet } from '../models/gift-set';
import { Postcard } from '../models/postcard';
import { Souvenir } from '../models/souvenir';

describe('GiftCategoryFilterService', () => {
  let service: GiftCategoryFilterService;

  beforeEach(() => {
    service = new GiftCategoryFilterService();
  });

  it('має показувати всі товари, якщо категорії не вибрані', (done) => {
    service.setProducts([
      new GiftSet('set-1', 'Набір чаю', 700, 2, 'чай', ['чай', 'мед']),
      new Postcard('card-1', 'Листівка', 40, 'свято', 'Вітаю зі святом'),
      new Souvenir('souvenir-1', 'Керамічна чашка', 240, 'кераміка', true)
    ]);

    service.filteredProducts$.subscribe((products) => {
      expect(products.length).toBe(3);
      done();
    });
  });

  it('має фільтрувати товари за кількома категоріями', (done) => {
    service.setProducts([
      new GiftSet('set-1', 'Набір чаю', 700, 2, 'чай', ['чай', 'мед']),
      new Postcard('card-1', 'Листівка', 40, 'свято', 'Вітаю зі святом'),
      new Souvenir('souvenir-1', 'Керамічна чашка', 240, 'кераміка', true),
      new GiftCertificate('cert-1', 'Сертифікат 500 грн', 500, 'Олена', 'email')
    ]);

    service.setSelectedCategories(['postcard', 'giftCertificate']);

    service.filteredProducts$.subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products.map((product) => product.type)).toEqual(['postcard', 'giftCertificate']);
      done();
    });
  });

  it('має фільтрувати товари за діапазоном ціни', (done) => {
    service.setProducts([
      new Postcard('card-1', 'Листівка', 40, 'свято', 'Вітаю зі святом'),
      new Souvenir('souvenir-1', 'Керамічна чашка', 240, 'кераміка', true),
      new GiftCertificate('cert-1', 'Сертифікат 500 грн', 500, 'Олена', 'email')
    ]);

    service.setPriceFilter({
      minPrice: 100,
      maxPrice: 300
    });

    service.filteredProducts$.subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products[0].title).toBe('Керамічна чашка');
      done();
    });
  });
});
