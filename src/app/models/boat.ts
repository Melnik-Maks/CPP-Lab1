import { WaterTransport } from './water-transport';

export class Boat extends WaterTransport {
  constructor(
    name: string,
    speed: number,
    capacity: number,
    public isRowing: boolean
  ) {
    super(name, speed, capacity);

    if (typeof isRowing !== 'boolean') {
      throw new Error('Ознака веслового човна має бути логічним значенням.');
    }
  }

  override displayInfo(): string {
    return `Човен: ${this.name}, швидкість: ${this.speed} км/год, місткість: ${this.capacity}, весловий: ${this.isRowing ? 'так' : 'ні'}`;
  }
}
