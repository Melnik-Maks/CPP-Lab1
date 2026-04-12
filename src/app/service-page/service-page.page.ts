import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList
} from '@ionic/angular/standalone';
import { Chart } from 'chart.js/auto';
import { MyHeaderComponent } from '../my-header/my-header.component';
import { FunctionPoint } from '../models/function-point';
import { RecursionService } from '../services/recursion/recursion.service';
import { SeriesService } from '../services/series/series.service';
import { TabService } from '../services/tab/tab.service';

@Component({
  selector: 'app-service-page',
  standalone: true,
  imports: [
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonInput,
    IonItem,
    IonList,
    FormsModule,
    MyHeaderComponent
  ],
  templateUrl: './service-page.page.html',
  styleUrls: ['./service-page.page.scss']
})
export class ServicePagePage {
  fullName = 'Мельник Максим';
  group = 'КН-31';
  variant = 'Варіант 9';

  xStart = -0.8;
  xEnd = 0.8;
  step = 0.2;
  epsilon = 0.000001;

  exactPoints: FunctionPoint[] = [];
  seriesPoints: FunctionPoint[] = [];
  recursionPoints: FunctionPoint[] = [];
  comparisonLines: string[] = [];
  statusText = 'Введіть параметри та натисніть "Обчислити".';

  @ViewChild('chartCanvas')
  chartCanvas?: ElementRef<HTMLCanvasElement>;

  chart: Chart | null = null;

  constructor(
    private readonly tabService: TabService,
    private readonly seriesService: SeriesService,
    private readonly recursionService: RecursionService
  ) {}

  calculate(): void {
    try {
      this.exactPoints = this.tabService.tabulate(this.xStart, this.xEnd, this.step);
      this.seriesPoints = this.seriesService.tabulate(this.xStart, this.xEnd, this.step, this.epsilon);
      this.recursionPoints = this.recursionService.tabulate(this.xStart, this.xEnd, this.step, this.epsilon);
      this.comparisonLines = this.buildComparisonLines();
      this.statusText = `Успішно обчислено ${this.exactPoints.length} значень функції arccos(x).`;

      this.buildChart();
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
      this.comparisonLines = [];

      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }
    }
  }

  private buildComparisonLines(): string[] {
    return this.exactPoints.map((point, index) => {
      const seriesPoint = this.seriesPoints[index];
      const recursionPoint = this.recursionPoints[index];

      return [
        `x = ${point.x.toFixed(2)}`,
        `табулювання = ${point.y.toFixed(6)}`,
        `ряд = ${seriesPoint.y.toFixed(6)}`,
        `рекурсія = ${recursionPoint.y.toFixed(6)}`
      ].join(' | ');
    });
  }

  private buildChart(): void {
    if (!this.chartCanvas) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.exactPoints.map((point) => point.x.toFixed(2));

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Табулювання',
            data: this.exactPoints.map((point) => point.y),
            borderColor: '#1b4965',
            backgroundColor: 'rgba(27, 73, 101, 0.15)',
            tension: 0.2
          },
          {
            label: 'Ряд',
            data: this.seriesPoints.map((point) => point.y),
            borderColor: '#e07a5f',
            backgroundColor: 'rgba(224, 122, 95, 0.15)',
            tension: 0.2
          },
          {
            label: 'Рекурсія',
            data: this.recursionPoints.map((point) => point.y),
            borderColor: '#3d405b',
            backgroundColor: 'rgba(61, 64, 91, 0.15)',
            tension: 0.2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}
