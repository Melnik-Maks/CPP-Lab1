import { WaterTransport } from './water-transport';

export class Boat extends WaterTransport {
  constructor(
    name: string,
    speed: number,
    capacity: number,
    public isRowing: boolean
  ) {
    super(name, speed, capacity);
  }

  override displayInfo(): string {
    return `Лодка: ${this.name}, швидкість: ${this.speed} км/год, місткість: ${this.capacity}, веслова: ${this.isRowing ? 'так' : 'ні'}`;
  }
}