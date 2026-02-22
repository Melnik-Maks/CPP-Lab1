import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { MyHeaderComponent } from '../my-header/my-header.component';

@Component({
  selector: 'app-tab3',
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, FormsModule, MyHeaderComponent],
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  fullName = 'Мельник Максим';
  group = 'КН-31';
  variant = 'Варіант 9';

  n = 3;
  matrix: number[][] = [];

  generate() {
    this.matrix = [];
    const N = Math.max(1, Math.min(this.n, 15));

    for (let i = 0; i < N; i++) {
      const row: number[] = [];
      for (let j = 0; j < N; j++) {
        row.push(Math.floor(Math.random() * 21) - 10);
      }
      this.matrix.push(row);
    }
  }

  isEvenNegative(x: number) {
    return x < 0 && x % 2 === 0;
  }
}