import { FormControl } from '@angular/forms';
import { GiftPriceValidatorService } from './gift-price-validator.service';

describe('GiftPriceValidatorService', () => {
  let service: GiftPriceValidatorService;

  beforeEach(() => {
    service = new GiftPriceValidatorService();
  });

  it('має повертати помилку, якщо ціна нижча за мінімум для типу товару', () => {
    const validator = service.minimumPriceForTypeValidator(() => 'giftSet');

    const result = validator(new FormControl(50));

    expect(result).toEqual({
      giftMinimumPrice: {
        minimumPrice: 100,
        actualPrice: 50
      }
    });
  });

  it('має дозволяти коректну ціну для листівки', () => {
    const validator = service.minimumPriceForTypeValidator(() => 'postcard');

    const result = validator(new FormControl(15));

    expect(result).toBeNull();
  });
});
