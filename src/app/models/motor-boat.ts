import { WaterTransport } from './water-transport';

export class MotorBoat extends WaterTransport {
  constructor(
    name: string,
    speed: number,
    capacity: number,
    public engineType: string
  ) {
    super(name, speed, capacity);
  }

  override displayInfo(): string {
    return `Катер: ${this.name}, швидкість: ${this.speed} км/год, місткість: ${this.capacity}, тип двигуна: ${this.engineType}`;
  }
}