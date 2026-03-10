import { Component } from '@angular/core';
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
import { WaterTransport } from '../models/water-transport';
import { TransportFactory } from '../models/transport-factory';
import { TransportData } from '../models/transport-data';

@Component({
  selector: 'app-abstract-class',
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
  templateUrl: './abstract-class.page.html',
  styleUrls: ['./abstract-class.page.scss']
})
export class AbstractClassPage {
  fullName = 'Мельник Максим';
  group = 'КН-31';
  variant = 'Варіант 9';

  dataUrl = 'https://api.jsonbin.io/v3/b/69b05e3384682b356286392b';
  n = 3;

  transports: WaterTransport[] = [];
  topFastest: WaterTransport[] = [];

  statusText = 'Введіть URL JSON';

  async loadData() {
    const url = this.dataUrl.trim();

    if (!url) {
      this.statusText = 'Помилка: введіть URL JSON';
      return;
    }

    try {
      this.statusText = 'Завантаження даних...';

      const response = await fetch(url);

      if (!response.ok) {
        this.statusText = `HTTP помилка: ${response.status}`;
        return;
      }

      const json = await response.json();
      const data = json.record ?? json;

      if (!Array.isArray(data)) {
        this.statusText = 'Помилка: JSON має бути масивом';
        return;
      }

      this.transports = data.map((item: TransportData) =>
        TransportFactory.create(item)
      );
      this.n = Math.min(this.transports.length, this.n);
      this.findTopFastest();

      this.statusText = `Успішно завантажено ${this.transports.length} транспортів`;
    } catch (error: any) {
      this.statusText = 'Помилка: ' + (error?.message ?? error);
      console.error(error);
    }
  }

  findTopFastest() {
    const count = Number(this.n);

    this.topFastest = [...this.transports]
      .sort((a, b) => b.getSpeed() - a.getSpeed())
      .slice(0, count);
  }
}