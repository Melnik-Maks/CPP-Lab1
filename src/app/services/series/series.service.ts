import { Injectable } from '@angular/core';
import { FunctionPoint } from '../../models/function-point';
import { LogService } from '../logger/log.service';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  constructor(private readonly logger: LogService) {}

  sumSeries(x: number, epsilon: number): number {
    this.validateInput(x, epsilon);

    if (x === -1) {
      return -Math.PI / 2;
    }

    if (x === 1) {
      return Math.PI / 2;
    }

    let sum = x;
    let term = x;
    let n = 0;

    while (true) {
      const nextTerm =
        term *
        ((2 * n + 1) * (2 * n + 1) * x * x) /
        (2 * (n + 1) * (2 * n + 3));

      if (Math.abs(nextTerm) < epsilon) {
        break;
      }

      sum += nextTerm;
      term = nextTerm;
      n++;
    }

    return sum;
  }

  calculate(x: number, epsilon: number): number {
    const y = Math.PI / 2 - this.sumSeries(x, epsilon);
    this.logger.logValue('Ряд', x, y);

    return y;
  }

  tabulate(xStart: number, xEnd: number, step: number, epsilon: number): FunctionPoint[] {
    return this.buildRange(xStart, xEnd, step).map((x) => ({
      x,
      y: this.calculate(x, epsilon)
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

  private validateInput(x: number, epsilon: number): void {
    if (x < -1 || x > 1) {
      throw new Error('Значення x має належати проміжку [-1; 1].');
    }

    if (epsilon <= 0) {
      throw new Error('Точність epsilon має бути більшою за 0.');
    }
  }
}
