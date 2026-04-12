export abstract class WaterTransport {
  constructor(
    public name: string,
    public speed: number,
    public capacity: number
  ) {
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new Error("Назва транспорту не може бути порожньою.");
    }

    if (speed <= 0) {
      throw new Error('Швидкість транспорту має бути більшою за 0.');
    }

    if (capacity <= 0) {
      throw new Error('Місткість транспорту не може бути відємною.');
    }

    if (capacity < 3) {
      throw new Error('Місткість транспорту має бути більшою за 3.');
    }
    
    if (capacity > 15) {
      throw new Error('Місткість транспорту має бути меншою за 15.');
    }

    this.name = normalizedName;
  }

  getSpeed(): number {
    return this.speed;
  }

  abstract displayInfo(): string;
}
