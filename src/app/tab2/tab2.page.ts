import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { MyHeaderComponent } from '../my-header/my-header.component';

@Component({
  selector: 'app-tab2',
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, FormsModule, MyHeaderComponent],
  templateUrl: 'tab2.page.html'
})
export class Tab2Page {
  fullName = 'Мельник Максим';
  group = 'КН-31';
  variant = 'Варіант 9';

  a = 0;
  b = 0;

  evens: number[] = [];
  sum = 0;

  calculate() {
    this.evens = [];
    this.sum = 0;

    const start = Math.min(this.a, this.b);
    const end = Math.max(this.a, this.b);

    for (let i = start; i <= end; i++) {
      if (i % 2 === 0) {
        this.evens.push(i);
        this.sum += i;
      }
    }
  }
}