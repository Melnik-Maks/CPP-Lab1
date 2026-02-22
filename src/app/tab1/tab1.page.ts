import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { MyHeaderComponent } from '../my-header/my-header.component';

@Component({
  selector: 'app-tab1',
  standalone: true,
  imports: [IonContent, IonItem, IonInput, IonButton, FormsModule, MyHeaderComponent],
  templateUrl: 'tab1.page.html'
})
export class Tab1Page {
  fullName = 'Мельник Максим';
  group = 'КН-31';
  variant = 'Варіант 9';

  a = 0;
  b = 0;
  c = 0;
  result = 0;

  calculate() {
    if (this.a % 2 === 0 || this.b % 2 === 0 || this.c % 2 === 0) {
      const sum = this.a + this.b + this.c;
      this.result = sum * sum * sum;
    } else {
      this.result =
        this.a * this.a * this.a +
        this.b * this.b * this.b +
        this.c * this.c * this.c;
    }
  }
}