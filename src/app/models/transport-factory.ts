import { WaterTransport } from './water-transport';
import { MotorBoat } from './motor-boat';
import { Boat } from './boat';
import { Yacht } from './yacht';
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

    if (item.type === 'boat') {
      return new Boat(
        item.name,
        item.speed,
        item.capacity,
        item.isRowing ?? false
      );
    }

    if (item.type === 'yacht') {
      return new Yacht(
        item.name,
        item.speed,
        item.capacity,
        item.hasCabins ?? false
      );
    }

    throw new Error(`Непідтримуваний тип транспорту: ${item.type}`);
  }
}
