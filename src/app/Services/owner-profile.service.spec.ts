import { TestBed } from '@angular/core/testing';

import { OwnerProfileService } from './owner-profile.service';

describe('OwnerProfileService', () => {
  let service: OwnerProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
