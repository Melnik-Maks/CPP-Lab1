export type TransportType = 'motorBoat' | 'boat';

export interface TransportData {
  type: TransportType;
  name: string;
  speed: number;
  capacity: number;
  engineType?: string;
  isRowing?: boolean;
}