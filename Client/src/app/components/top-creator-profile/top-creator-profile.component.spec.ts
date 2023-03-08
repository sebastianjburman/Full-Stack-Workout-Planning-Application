import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCreatorProfileComponent } from './top-creator-profile.component';

describe('TopCreatorProfileComponent', () => {
  let component: TopCreatorProfileComponent;
  let fixture: ComponentFixture<TopCreatorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCreatorProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopCreatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
