import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiftShopPage } from './gift-shop.page';

describe('GiftShopPage', () => {
  let component: GiftShopPage;
  let fixture: ComponentFixture<GiftShopPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftShopPage]
    }).compileComponents();

    fixture = TestBed.createComponent(GiftShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('має створювати сторінку магазину подарунків', () => {
    expect(component).toBeTruthy();
    expect(component.packagingOptions.length).toBe(3);
  });

  it('має змінювати кілька вибраних категорій для RxJS-фільтра', () => {
    component.changeCategories(['giftCertificate', 'souvenir']);

    expect(component.selectedCategories).toEqual(['giftCertificate', 'souvenir']);
  });

  it('має очищати всі фільтри', () => {
    component.changeCategories(['giftSet']);
    component.minPrice = 100;
    component.maxPrice = 800;

    component.clearFilters();

    expect(component.selectedCategories).toEqual([]);
    expect(component.minPrice).toBeNull();
    expect(component.maxPrice).toBeNull();
  });
});
