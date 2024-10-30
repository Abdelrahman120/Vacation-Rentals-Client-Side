import { TestBed } from '@angular/core/testing';

import { AdminServicesService } from './admin-services.service';

describe('AdminServicesService', () => {
  let service: AdminServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
