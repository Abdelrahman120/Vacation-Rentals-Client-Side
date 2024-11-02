import { TestBed } from '@angular/core/testing';

import { RefreshServicesService } from './refresh-services.service';

describe('RefreshServicesService', () => {
  let service: RefreshServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
