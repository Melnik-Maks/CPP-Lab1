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
});
