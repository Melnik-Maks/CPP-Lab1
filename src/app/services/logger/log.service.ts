import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logValue(methodName: string, x: number, y: number): void {
    console.log(`[${methodName}] x=${x.toFixed(4)}; y=${y.toFixed(8)}`);
  }
}
