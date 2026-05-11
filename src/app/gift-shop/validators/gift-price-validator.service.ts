import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class GiftPriceValidatorService {
  private readonly minimumPriceByType: Record<string, number> = {
    giftSet: 100,
    postcard: 10,
    souvenir: 20,
    giftCertificate: 100
  };

  minimumPriceForTypeValidator(getProductType: () => string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const productType = getProductType();
      const minimumPrice = this.minimumPriceByType[productType] ?? 1;
      const value = Number(control.value);

      if (Number.isNaN(value)) {
        return null;
      }

      return value >= minimumPrice
        ? null
        : {
            giftMinimumPrice: {
              minimumPrice,
              actualPrice: value
            }
          };
    };
  }
}
