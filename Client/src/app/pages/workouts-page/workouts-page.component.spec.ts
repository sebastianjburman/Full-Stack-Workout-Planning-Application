import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsPageComponent } from './workouts-page.component';

describe('WorkoutsPageComponent', () => {
  let component: WorkoutsPageComponent;
  let fixture: ComponentFixture<WorkoutsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
