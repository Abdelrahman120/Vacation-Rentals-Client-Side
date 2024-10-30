import { TestBed } from '@angular/core/testing';

import { OwnerAuthService } from './owner-auth.service';

describe('OwnerAuthService', () => {
  let service: OwnerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
