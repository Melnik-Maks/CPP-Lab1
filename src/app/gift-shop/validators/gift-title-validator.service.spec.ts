import { FormControl } from '@angular/forms';
import { GiftSet } from '../models/gift-set';
import { GiftTitleValidatorService } from './gift-title-validator.service';

describe('GiftTitleValidatorService', () => {
  let service: GiftTitleValidatorService;

  beforeEach(() => {
    service = new GiftTitleValidatorService();
  });

  it('має повертати помилку, якщо назва товару вже існує', () => {
    const validator = service.uniqueTitleValidator(
      () => [new GiftSet('set-1', 'Святковий набір', 500, 2, 'свято')],
      () => null
    );

    const result = validator(new FormControl('Святковий набір'));

    expect(result).toEqual({ giftTitleTaken: true });
  });

  it('має дозволяти залишити поточну назву під час редагування', () => {
    const validator = service.uniqueTitleValidator(
      () => [new GiftSet('set-1', 'Святковий набір', 500, 2, 'свято')],
      () => 'set-1'
    );

    const result = validator(new FormControl('Святковий набір'));

    expect(result).toBeNull();
  });
});
