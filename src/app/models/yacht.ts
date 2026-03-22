import { WaterTransport } from './water-transport';

export class Yacht extends WaterTransport {
  constructor(
    name: string,
    speed: number,
    capacity: number,
    public hasCabins: boolean
  ) {
    super(name, speed, capacity);

    if (typeof hasCabins !== 'boolean') {
      throw new Error('Ознака наявності кают має бути логічним значенням.');
    }
  }

  override displayInfo(): string {
    return `Яхта: ${this.name}, швидкість: ${this.speed} км/год, місткість: ${this.capacity}, каюти: ${this.hasCabins ? 'є' : 'немає'}`;
  }
}
