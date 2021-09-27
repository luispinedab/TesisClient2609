import { TestBed } from '@angular/core/testing';

import { InfoestudianteService } from './infoestudiante.service';

describe('InfoestudianteService', () => {
  let service: InfoestudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoestudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
