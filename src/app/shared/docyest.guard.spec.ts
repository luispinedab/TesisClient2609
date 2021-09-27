import { TestBed } from '@angular/core/testing';

import { DocyestGuard } from './docyest.guard';

describe('DocyestGuard', () => {
  let guard: DocyestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DocyestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
