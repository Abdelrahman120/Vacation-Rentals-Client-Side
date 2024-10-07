import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ownerGuardGuard } from './owner-guard.guard';

describe('ownerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ownerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
