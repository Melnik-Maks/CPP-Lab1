import { Yacht } from './yacht';

describe('Yacht', () => {
  let yacht: Yacht;

  beforeEach(() => {
    yacht = new Yacht('Аврора', 45, 12, true);
  });

  it('має створювати екземпляр яхти', () => {
    expect(yacht).toBeTruthy();
    expect(yacht.name).toBe('Аврора');
    expect(yacht.capacity).toBe(12);
    expect(yacht.hasCabins).toBeTrue();
  });

  it('має повертати швидкість через getSpeed', () => {
    expect(yacht.getSpeed()).toBe(45);
  });

  it('має повертати коректний опис через displayInfo', () => {
    const info = yacht.displayInfo();

    expect(info).toContain('Яхта');
    expect(info).toContain('Аврора');
    expect(info).toContain('45');
    expect(info).toContain('12');
    expect(info).toContain('є');
  });

  it('має викидати помилку, якщо швидкість відʼємна', () => {
    expect(() => new Yacht('Аврора', -10, 12, true)).toThrowError(
      'Швидкість транспорту має бути більшою за 0.'
    );
  });

  it('має викидати помилку, якщо місткість < 3 чи > 15', () => {
    expect(() => new Yacht('Аврора', 10, 1, true)).toThrowError(
      'Місткість транспорту має бути більшою за 3.'
    );
    expect(() => new Yacht('Аврора', 10, 17, true)).toThrowError(
      'Місткість транспорту має бути меншою за 15.'
    );
  });
});
