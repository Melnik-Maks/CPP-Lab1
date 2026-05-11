import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { GiftProduct } from '../contracts/gift-product.interface';

@Injectable()
export class GiftTitleValidatorService {
  uniqueTitleValidator(
    getProducts: () => GiftProduct[],
    getCurrentProductId: () => string | null
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const title = String(control.value ?? '').trim().toLowerCase();

      if (!title) {
        return null;
      }

      const currentProductId = getCurrentProductId();
      const titleExists = getProducts().some((product) => {
        return product.id !== currentProductId && product.title.trim().toLowerCase() === title;
      });

      return titleExists ? { giftTitleTaken: true } : null;
    };
  }
}
