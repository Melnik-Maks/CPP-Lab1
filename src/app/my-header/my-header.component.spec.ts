import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyHeaderComponent } from './my-header.component';

describe('MyHeaderComponent', () => {
  let component: MyHeaderComponent;
  let fixture: ComponentFixture<MyHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), MyHeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
