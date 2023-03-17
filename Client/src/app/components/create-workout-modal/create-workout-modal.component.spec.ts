import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkoutModalComponent } from './create-workout-modal.component';

describe('CreateWorkoutModalComponent', () => {
  let component: CreateWorkoutModalComponent;
  let fixture: ComponentFixture<CreateWorkoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkoutModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWorkoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
