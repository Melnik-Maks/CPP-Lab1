import { TestBed } from '@angular/core/testing';
import { LogService } from '../logger/log.service';
import { TabService } from './tab.service';

describe('TabService', () => {
  let service: TabService;
  let loggerSpy: jasmine.SpyObj<LogService>;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LogService', ['logValue']);

    TestBed.configureTestingModule({
      providers: [
        TabService,
        { provide: LogService, useValue: loggerSpy }
      ]
    });

    service = TestBed.inject(TabService);
  });

  it('має правильно обчислювати значення arccos(x)', () => {
    expect(service.calculate(0.5)).toBeCloseTo(Math.acos(0.5), 10);
    expect(loggerSpy.logValue).toHaveBeenCalled();
  });

  it('має правильно табулювати функцію на відрізку', () => {
    const points = service.tabulate(-0.5, 0.5, 0.5);

    expect(points.length).toBe(3);
    expect(points[0].y).toBeCloseTo(Math.acos(-0.5), 10);
    expect(points[1].y).toBeCloseTo(Math.acos(0), 10);
    expect(points[2].y).toBeCloseTo(Math.acos(0.5), 10);
  });
});
