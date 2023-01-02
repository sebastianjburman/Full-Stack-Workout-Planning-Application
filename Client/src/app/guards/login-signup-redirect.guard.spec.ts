import { TestBed } from '@angular/core/testing';

import { LoginSignupRedirectGuard } from './login-signup-redirect.guard';

describe('LoginSignupRedirectGuard', () => {
  let guard: LoginSignupRedirectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginSignupRedirectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
