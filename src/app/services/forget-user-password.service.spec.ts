import { TestBed } from '@angular/core/testing';

import { ForgetUserPasswordService } from './forget-user-password.service';

describe('ForgetUserPasswordService', () => {
  let service: ForgetUserPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetUserPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
