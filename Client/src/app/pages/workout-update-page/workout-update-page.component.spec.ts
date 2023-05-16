import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutUpdatePageComponent } from './workout-update-page.component';

describe('WorkoutUpdatePageComponent', () => {
  let component: WorkoutUpdatePageComponent;
  let fixture: ComponentFixture<WorkoutUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutUpdatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
