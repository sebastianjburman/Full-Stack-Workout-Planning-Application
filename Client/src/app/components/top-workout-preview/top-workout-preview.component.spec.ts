import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopWorkoutPreviewComponent } from './top-workout-preview.component';

describe('TopWorkoutPreviewComponent', () => {
  let component: TopWorkoutPreviewComponent;
  let fixture: ComponentFixture<TopWorkoutPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopWorkoutPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopWorkoutPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
