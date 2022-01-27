import { TestBed } from '@angular/core/testing';

import { MakeModalService } from './make-modal.service';

describe('MakeModalService', () => {
  let service: MakeModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
