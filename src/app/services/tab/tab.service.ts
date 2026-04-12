import { Injectable } from '@angular/core';
import { FunctionPoint } from '../../models/function-point';
import { LogService } from '../logger/log.service';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  constructor(private readonly logger: LogService) {}

  calculate(x: number): number {
    this.validateX(x);

    const y = Math.acos(x);
    this.logger.logValue('Табулювання', x, y);

    return y;
  }

  tabulate(xStart: number, xEnd: number, step: number): FunctionPoint[] {
    return this.buildRange(xStart, xEnd, step).map((x) => ({
      x,
      y: this.calculate(x)
    }));
  }

  private buildRange(xStart: number, xEnd: number, step: number): number[] {
    if (step <= 0) {
      throw new Error('Крок табулювання має бути більшим за 0.');
    }

    const start = Math.min(xStart, xEnd);
    const end = Math.max(xStart, xEnd);
    const values: number[] = [];

    for (let current = start; current <= end + step / 10; current += step) {
      values.push(Number(current.toFixed(10)));
    }

    return values;
  }

  private validateX(x: number): void {
    if (x < -1 || x > 1) {
      throw new Error('Значення x має належати проміжку [-1; 1].');
    }
  }
}
