import { TestBed } from '@angular/core/testing';

import { AdministrarGuard } from './administrar.guard';

describe('AdministrarGuard', () => {
  let guard: AdministrarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdministrarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
