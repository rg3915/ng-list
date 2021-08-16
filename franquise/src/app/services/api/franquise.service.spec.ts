import { TestBed } from '@angular/core/testing';

import { FranquiseService } from './franquise.service';

describe('FranquiseService', () => {
  let service: FranquiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FranquiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
