import { WaterTransport } from './water-transport';
import { MotorBoat } from './motor-boat';
import { Boat } from './boat';
import { TransportData } from './transport-data';

export class TransportFactory {
  static create(item: TransportData): WaterTransport {
    if (item.type === 'motorBoat') {
      return new MotorBoat(
        item.name,
        item.speed,
        item.capacity,
        item.engineType ?? 'невідомо'
      );
    }

    return new Boat(
      item.name,
      item.speed,
      item.capacity,
      item.isRowing ?? false
    );
  }
}