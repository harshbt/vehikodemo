import { TestBed } from '@angular/core/testing';

import { SelectPackageService } from './select-package.service';

describe('SelectPackageService', () => {
  let service: SelectPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
