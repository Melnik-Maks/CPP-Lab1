import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractClassPage } from './abstract-class.page';

describe('AbstractClassPage', () => {
  let component: AbstractClassPage;
  let fixture: ComponentFixture<AbstractClassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
