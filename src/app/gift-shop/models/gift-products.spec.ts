import { GiftCertificate } from './gift-certificate';
import { GiftSet } from './gift-set';
import { Postcard } from './postcard';
import { Souvenir } from './souvenir';

describe('Gift products', () => {
  it('має створювати подарунковий набір та повертати його деталі', () => {
    const product = new GiftSet('set-1', 'Теплий вечір', 650, 4, 'затишок');

    expect(product.categoryLabel).toBe('Подарунковий набір');
    expect(product.getDetails()).toEqual([
      'Елементів у наборі: 4',
      'Тематика: затишок'
    ]);
  });

  it('має створювати листівку з персональним повідомленням', () => {
    const product = new Postcard('card-1', 'Листівка для мами', 60, 'свято', 'Обіймаю міцно');

    expect(product.getPersonalMessage()).toBe('Обіймаю міцно');
    expect(product.getDetails()[0]).toContain('свято');
  });

  it('має створювати сувенір і визначати крихкість', () => {
    const product = new Souvenir('souvenir-1', 'Керамічна чашка', 240, 'кераміка', true);

    expect(product.requiresProtection()).toBeTrue();
    expect(product.getDetails()[1]).toContain('так');
  });

  it('має створювати подарунковий сертифікат як розширення системи', () => {
    const product = new GiftCertificate('cert-1', 'Сертифікат на 500 грн', 500, 'Олена', 'email');

    expect(product.categoryLabel).toBe('Подарунковий сертифікат');
    expect(product.getPersonalMessage()).toContain('Олена');
  });

  it('має викидати помилку для некоректної ціни товару', () => {
    expect(() => new GiftSet('set-2', 'Некоректний набір', 0, 2, 'свято')).toThrowError(
      'Базова ціна товару має бути більшою за 0.'
    );
  });
});
