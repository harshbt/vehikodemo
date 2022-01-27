import { TestBed } from '@angular/core/testing';

import { PowertrainService } from './powertrain.service';

describe('PowertrainService', () => {
  let service: PowertrainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowertrainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
