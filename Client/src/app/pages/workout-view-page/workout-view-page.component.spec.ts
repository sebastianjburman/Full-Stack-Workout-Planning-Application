import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutViewPageComponent } from './workout-view-page.component';

describe('WorkoutViewPageComponent', () => {
  let component: WorkoutViewPageComponent;
  let fixture: ComponentFixture<WorkoutViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
