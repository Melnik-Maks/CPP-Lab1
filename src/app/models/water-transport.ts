export abstract class WaterTransport {
  constructor(
    public name: string,
    public speed: number,
    public capacity: number
  ) {}

  getSpeed(): number {
    return this.speed;
  }
  
  abstract displayInfo(): string;
}