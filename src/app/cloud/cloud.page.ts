import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

import { MyHeaderComponent } from '../my-header/my-header.component';
import { Chart } from 'chart.js/auto';

import { Subject } from '../models/subject.model';
import { TeacherSubjects } from '../models/teacher-subjects.model';

@Component({
  selector: 'app-cloud',
  standalone: true,
  imports: [
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    FormsModule,
    MyHeaderComponent
  ],
  templateUrl: './cloud.page.html',
  styleUrls: ['./cloud.page.scss']
})
export class CloudPage {

  fullName = 'Мельник Максим';
  group = 'КН-31';
  variant = 'Варіант 9';

  dataUrl = 'https://api.jsonbin.io/v3/b/69a5d993d0ea881f40e8295b';
  subjects: Subject[] = [];
  grouped: TeacherSubjects[] = [];

  @ViewChild('chartCanvas')
  chartCanvas?: ElementRef<HTMLCanvasElement>;

  chart: Chart | null = null;

  async loadData() {

    const response = await fetch(this.dataUrl);
    const json = await response.json();

    const data = json.record ?? json;

    this.subjects = data.map((x: any) =>
      new Subject(
        x.title,
        x.department,
        x.lectureTeacher,
        x.labTeacher
      )
    );

    this.groupByTeachers();
    this.buildChart();
  }

  groupByTeachers() {

    const map = new Map<string, TeacherSubjects>();

    for (const s of this.subjects) {

      if (!map.has(s.lectureTeacher)) {
        map.set(s.lectureTeacher, new TeacherSubjects(s.lectureTeacher));
      }

      if (!map.has(s.labTeacher)) {
        map.set(s.labTeacher, new TeacherSubjects(s.labTeacher));
      }

      map.get(s.lectureTeacher)!.add(s);
      map.get(s.labTeacher)!.add(s);
    }

    this.grouped = Array.from(map.values());
  }

  buildChart() {

    if (!this.chartCanvas) return;

    const labels = this.grouped.map(g => g.teacherName);
    const values = this.grouped.map(g => g.count);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Кількість дисциплін',
          data: values
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
  getDepartmentColor(department: string): string {

    const colors = [
      '#4e73df',
      '#1cc88a',
      '#36b9cc',
      '#f6c23e',
      '#e74a3b',
      '#6f42c1'
    ];

    let index = 0;

    for (let i = 0; i < department.length; i++) {
      index += department.charCodeAt(i);
    }

    return colors[index % colors.length];
  }
}