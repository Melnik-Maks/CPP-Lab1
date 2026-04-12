import { TestBed } from '@angular/core/testing';
import { LogService } from '../logger/log.service';
import { SeriesService } from './series.service';

describe('SeriesService', () => {
  let service: SeriesService;
  let loggerSpy: jasmine.SpyObj<LogService>;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LogService', ['logValue']);

    TestBed.configureTestingModule({
      providers: [
        SeriesService,
        { provide: LogService, useValue: loggerSpy }
      ]
    });

    service = TestBed.inject(SeriesService);
  });

  it('має правильно обчислювати суму ряду', () => {
    expect(service.sumSeries(0.5, 0.0000001)).toBeCloseTo(Math.asin(0.5), 6);
  });

  it('має правильно обчислювати arccos(x) за допомогою ряду', () => {
    expect(service.calculate(0.5, 0.0000001)).toBeCloseTo(Math.acos(0.5), 6);
    expect(loggerSpy.logValue).toHaveBeenCalled();
  });

  it('має правильно табулювати функцію за допомогою ряду', () => {
    const points = service.tabulate(-0.5, 0.5, 0.5, 0.0000001);

    expect(points.length).toBe(3);
    expect(points[0].y).toBeCloseTo(Math.acos(-0.5), 6);
    expect(points[1].y).toBeCloseTo(Math.acos(0), 6);
    expect(points[2].y).toBeCloseTo(Math.acos(0.5), 6);
  });
});
