import { Provider } from '@angular/core';
import { GiftCertificateCreator } from './creators/gift-certificate.creator';
import { GiftSetCreator } from './creators/gift-set.creator';
import { PostcardCreator } from './creators/postcard.creator';
import { SouvenirCreator } from './creators/souvenir.creator';
import { GIFT_DATA_SOURCE, GIFT_PRODUCT_CREATORS, PACKAGING_STRATEGIES } from './gift-shop.tokens';
import { ClassicWrapStrategy } from './packaging/classic-wrap.strategy';
import { EcoWrapStrategy } from './packaging/eco-wrap.strategy';
import { PremiumBoxStrategy } from './packaging/premium-box.strategy';
import { GiftCatalogService } from './services/gift-catalog.service';
import { GiftOrderService } from './services/gift-order.service';
import { GiftPackagingService } from './services/gift-packaging.service';
import { GiftProductFactoryService } from './services/gift-product-factory.service';
import { GiftCategoryFilterService } from './services/gift-category-filter.service';
import { FirebaseGiftDataSourceService } from './services/firebase-gift-data-source.service';
import { GiftPriceValidatorService } from './validators/gift-price-validator.service';
import { GiftTitleValidatorService } from './validators/gift-title-validator.service';

export function provideGiftShop(): Provider[] {
  return [
    GiftCatalogService,
    GiftOrderService,
    GiftPackagingService,
    GiftProductFactoryService,
    GiftCategoryFilterService,
    GiftPriceValidatorService,
    GiftTitleValidatorService,
    { provide: GIFT_DATA_SOURCE, useClass: FirebaseGiftDataSourceService },
    { provide: GIFT_PRODUCT_CREATORS, useClass: GiftSetCreator, multi: true },
    { provide: GIFT_PRODUCT_CREATORS, useClass: PostcardCreator, multi: true },
    { provide: GIFT_PRODUCT_CREATORS, useClass: SouvenirCreator, multi: true },
    { provide: GIFT_PRODUCT_CREATORS, useClass: GiftCertificateCreator, multi: true },
    { provide: PACKAGING_STRATEGIES, useClass: ClassicWrapStrategy, multi: true },
    { provide: PACKAGING_STRATEGIES, useClass: EcoWrapStrategy, multi: true },
    { provide: PACKAGING_STRATEGIES, useClass: PremiumBoxStrategy, multi: true }
  ];
}
