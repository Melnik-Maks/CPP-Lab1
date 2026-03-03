import { Component, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-header',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton],
  templateUrl: './my-header.component.html'
})
export class MyHeaderComponent {
  @Input() fullName = '';
  @Input() group = '';
  @Input() variant = '';
}