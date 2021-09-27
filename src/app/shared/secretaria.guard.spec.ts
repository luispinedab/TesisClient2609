import { TestBed } from '@angular/core/testing';

import { SecretariaGuard } from './secretaria.guard';

describe('SecretariaGuard', () => {
  let guard: SecretariaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecretariaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
