import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiftProductFormComponent } from './gift-product-form.component';
import { Postcard } from '../../models/postcard';
import { provideGiftShop } from '../../gift-shop.providers';

describe('GiftProductFormComponent', () => {
  let component: GiftProductFormComponent;
  let fixture: ComponentFixture<GiftProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiftProductFormComponent],
      providers: [...provideGiftShop()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiftProductFormComponent);
    component = fixture.componentInstance;
  });

  it('має зберігати зміни під час редагування листівки', () => {
    const product = new Postcard('card-1', 'Листівка для мами', 60, 'свято', 'Обіймаю міцно');
    const emitSpy = spyOn(component.productSaved, 'emit');

    component.mode = 'edit';
    component.products = [product];
    component.initialProduct = product;
    fixture.detectChanges();

    component.form.patchValue({
      title: 'Оновлена листівка',
      occasion: 'день народження',
      message: 'Бажаю радості щодня'
    });
    component.submit();

    expect(emitSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        id: 'card-1',
        type: 'postcard',
        title: 'Оновлена листівка',
        occasion: 'день народження',
        message: 'Бажаю радості щодня'
      })
    );
  });
});
