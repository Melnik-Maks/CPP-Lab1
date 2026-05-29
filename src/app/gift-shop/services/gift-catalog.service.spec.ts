import { TestBed } from '@angular/core/testing';
import { GIFT_DATA_SOURCE } from '../gift-shop.tokens';
import { provideGiftShop } from '../gift-shop.providers';
import { GiftCatalogService } from './gift-catalog.service';
import { GiftDataSource } from '../contracts/gift-data-source.interface';
import { GiftProductData } from '../models/gift-product-data';

describe('GiftCatalogService', () => {
  let service: GiftCatalogService;
  let sourceSpy: jasmine.SpyObj<GiftDataSource>;

  beforeEach(() => {
    sourceSpy = jasmine.createSpyObj<GiftDataSource>('GiftDataSource', [
      'loadProducts',
      'saveProducts',
      'addProduct',
      'updateProduct',
      'deleteProduct'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ...provideGiftShop(),
        { provide: GIFT_DATA_SOURCE, useValue: sourceSpy }
      ]
    });

    service = TestBed.inject(GiftCatalogService);
  });

  it('має завантажувати каталог із Firebase і перетворювати дані на обʼєкти', async () => {
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

    const products = await service.loadCatalog('gift-products');

    expect(sourceSpy.loadProducts).toHaveBeenCalledWith('gift-products');
    expect(products.length).toBe(2);
    expect(products[0].categoryLabel).toBe('Подарунковий набір');
    expect(products[1].categoryLabel).toBe('Подарунковий сертифікат');
  });

  it('має зберігати весь каталог у Firebase', async () => {
    const products: GiftProductData[] = [
      {
        id: 'card-1',
        type: 'postcard',
        title: 'Листівка',
        basePrice: 50,
        occasion: 'свято',
        message: 'Вітаю'
      }
    ];
    sourceSpy.saveProducts.and.resolveTo();

    await service.saveProducts('gift-products', products);

    expect(sourceSpy.saveProducts).toHaveBeenCalledWith('gift-products', products);
  });

  it('має додавати товар у Firebase', async () => {
    const product: GiftProductData = {
      id: 'souvenir-1',
      type: 'souvenir',
      title: 'Сувенір',
      basePrice: 200,
      material: 'дерево',
      isFragile: false
    };
    sourceSpy.addProduct.and.resolveTo();

    await service.addProduct('gift-products', product);

    expect(sourceSpy.addProduct).toHaveBeenCalledWith('gift-products', product);
  });

  it('має редагувати товар у Firebase', async () => {
    const product: GiftProductData = {
      id: 'cert-1',
      type: 'giftCertificate',
      title: 'Сертифікат',
      basePrice: 500,
      recipientName: 'Олена',
      deliveryType: 'email'
    };
    sourceSpy.updateProduct.and.resolveTo();

    await service.updateProduct('gift-products', product);

    expect(sourceSpy.updateProduct).toHaveBeenCalledWith('gift-products', product);
  });

  it('має видаляти товар із Firebase', async () => {
    sourceSpy.deleteProduct.and.resolveTo();

    await service.deleteProduct('gift-products', 'card-1');

    expect(sourceSpy.deleteProduct).toHaveBeenCalledWith('gift-products', 'card-1');
  });
});
