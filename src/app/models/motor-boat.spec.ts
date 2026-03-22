import { MotorBoat } from './motor-boat';

describe('MotorBoat', () => {
  let motorBoat: MotorBoat;

  beforeEach(() => {
    motorBoat = new MotorBoat('Шторм', 70, 6, 'дизельний');
  });

  it('має створювати екземпляр катера', () => {
    expect(motorBoat).toBeTruthy();
    expect(motorBoat.name).toBe('Шторм');
    expect(motorBoat.capacity).toBe(6);
    expect(motorBoat.engineType).toBe('дизельний');
  });

  it('має повертати швидкість через getSpeed', () => {
    expect(motorBoat.getSpeed()).toBe(70);
  });

  it('має повертати коректний опис через displayInfo', () => {
    const info = motorBoat.displayInfo();

    expect(info).toContain('Катер');
    expect(info).toContain('Шторм');
    expect(info).toContain('70');
    expect(info).toContain('дизельний');
  });

  it('має обрізати пробіли в типі двигуна під час створення', () => {
    const boat = new MotorBoat('Хвиля', 55, 5, '  бензиновий  ');

    expect(boat.engineType).toBe('бензиновий');
  });

  it('має викидати помилку, якщо тип двигуна порожній', () => {
    expect(() => new MotorBoat('Шторм', 70, 6, '   ')).toThrowError(
      'Тип двигуна катера не може бути порожнім.'
    );
  });
});
