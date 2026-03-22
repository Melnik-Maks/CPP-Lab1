import { Boat } from './boat';

describe('Boat', () => {
  let boat: Boat;

  beforeEach(() => {
    boat = new Boat('Рибалка', 18, 4, true);
  });

  it('має створювати екземпляр човна', () => {
    expect(boat).toBeTruthy();
    expect(boat.name).toBe('Рибалка');
    expect(boat.capacity).toBe(4);
    expect(boat.isRowing).toBeTrue();
  });

  it('має повертати швидкість через getSpeed', () => {
    expect(boat.getSpeed()).toBe(18);
  });

  it('має повертати коректний опис через displayInfo', () => {
    const info = boat.displayInfo();

    expect(info).toContain('Човен');
    expect(info).toContain('Рибалка');
    expect(info).toContain('18');
    expect(info).toContain('4');
    expect(info).toContain('так');
  });

  it('має викидати помилку, якщо назва порожня', () => {
    expect(() => new Boat('   ', 18, 4, true)).toThrowError(
      'Назва транспорту не може бути порожньою.'
    );
  });

  it('має викидати помилку, якщо швидкість не додатна', () => {
    expect(() => new Boat('Рибалка', 0, 4, true)).toThrowError(
      'Швидкість транспорту має бути більшою за 0.'
    );
  });

  it('має викидати помилку, якщо місткість не додатна', () => {
    expect(() => new Boat('Рибалка', 18, -1, true)).toThrowError(
      'Місткість транспорту має бути більшою за 0.'
    );
  });
});
