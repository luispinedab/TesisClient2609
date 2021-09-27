import { TestBed } from '@angular/core/testing';

import { SecyestGuard } from './secyest.guard';

describe('SecyestGuard', () => {
  let guard: SecyestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecyestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
