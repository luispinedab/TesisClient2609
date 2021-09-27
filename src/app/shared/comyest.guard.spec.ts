import { TestBed } from '@angular/core/testing';

import { ComyestGuard } from './comyest.guard';

describe('ComyestGuard', () => {
  let guard: ComyestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComyestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
