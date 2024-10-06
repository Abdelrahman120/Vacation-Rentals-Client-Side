import { TestBed } from '@angular/core/testing';

import { OwnerInfoService } from './owner-info.service';

describe('OwnerInfoService', () => {
  let service: OwnerInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
