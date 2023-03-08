import { TestBed } from '@angular/core/testing';

import { ExerciseServiceService } from './exercise-service.service';

describe('ExerciseServiceService', () => {
  let service: ExerciseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
