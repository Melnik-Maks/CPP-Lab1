import { TestBed } from '@angular/core/testing';
import { LogService } from '../logger/log.service';
import { RecursionService } from './recursion.service';

describe('RecursionService', () => {
  let service: RecursionService;
  let loggerSpy: jasmine.SpyObj<LogService>;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LogService', ['logValue']);

    TestBed.configureTestingModule({
      providers: [
        RecursionService,
        { provide: LogService, useValue: loggerSpy }
      ]
    });

    service = TestBed.inject(RecursionService);
  });

  it('має правильно обчислювати суму ряду рекурсивно', () => {
    expect(service.sumSeriesRecursive(0.5, 0.0000001)).toBeCloseTo(Math.asin(0.5), 6);
  });

  it('має правильно обчислювати arccos(x) за допомогою рекурсії', () => {
    expect(service.calculate(0.5, 0.0000001)).toBeCloseTo(Math.acos(0.5), 6);
    expect(loggerSpy.logValue).toHaveBeenCalled();
  });

  it('має правильно табулювати функцію за допомогою рекурсії', () => {
    const points = service.tabulate(-0.5, 0.5, 0.5, 0.0000001);

    expect(points.length).toBe(3);
    expect(points[0].y).toBeCloseTo(Math.acos(-0.5), 6);
    expect(points[1].y).toBeCloseTo(Math.acos(0), 6);
    expect(points[2].y).toBeCloseTo(Math.acos(0.5), 6);
  });
});
