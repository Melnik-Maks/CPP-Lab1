import { Boat } from './boat';
import { MotorBoat } from './motor-boat';
import { TransportFactory } from './transport-factory';
import { Yacht } from './yacht';

describe('TransportFactory', () => {
  it('має створювати човен через фабрику', () => {
    const transport = TransportFactory.create({
      type: 'boat',
      name: 'Річковий',
      speed: 16,
      capacity: 3,
      isRowing: true
    });

    expect(transport instanceof Boat).toBeTrue();
    expect(transport.displayInfo()).toContain('Річковий');
  });

  it('має створювати катер через фабрику', () => {
    const transport = TransportFactory.create({
      type: 'motorBoat',
      name: 'Блискавка',
      speed: 80,
      capacity: 5,
      engineType: 'електричний'
    });

    expect(transport instanceof MotorBoat).toBeTrue();
    expect(transport.displayInfo()).toContain('електричний');
  });

  it('має створювати яхту через фабрику', () => {
    const transport = TransportFactory.create({
      type: 'yacht',
      name: 'Перлина',
      speed: 40,
      capacity: 10,
      hasCabins: true
    });

    expect(transport instanceof Yacht).toBeTrue();
    expect(transport.displayInfo()).toContain('Перлина');
  });

  it('має використовувати значення за замовчуванням для необовʼязкових полів', () => {
    const boat = TransportFactory.create({
      type: 'boat',
      name: 'Простий',
      speed: 10,
      capacity: 11
    }) as Boat;

    const yacht = TransportFactory.create({
      type: 'yacht',
      name: 'Спокій',
      speed: 32,
      capacity: 8
    }) as Yacht;

    expect(boat.isRowing).toBeFalse();
    expect(yacht.hasCabins).toBeFalse();
  });

  it('має викидати помилку для непідтримуваного типу транспорту', () => {
    expect(() =>
      TransportFactory.create({
        type: 'submarine' as never,
        name: 'Глибина',
        speed: 20,
        capacity: 6
      })
    ).toThrowError('Непідтримуваний тип транспорту: submarine');
  });
});
