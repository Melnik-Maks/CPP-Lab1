export type TransportType = 'motorBoat' | 'boat' | 'yacht';

export interface TransportData {
  type: TransportType;
  name: string;
  speed: number;
  capacity: number;
  engineType?: string;
  isRowing?: boolean;
  hasCabins?: boolean;
}
