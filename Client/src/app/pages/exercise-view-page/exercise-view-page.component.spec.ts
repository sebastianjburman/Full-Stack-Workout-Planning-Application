import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseViewPageComponent } from './exercise-view-page.component';

describe('ExerciseViewPageComponent', () => {
  let component: ExerciseViewPageComponent;
  let fixture: ComponentFixture<ExerciseViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
