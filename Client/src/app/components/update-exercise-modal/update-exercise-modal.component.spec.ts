import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExerciseModalComponent } from './update-exercise-modal.component';

describe('UpdateExerciseModalComponent', () => {
  let component: UpdateExerciseModalComponent;
  let fixture: ComponentFixture<UpdateExerciseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExerciseModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateExerciseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
