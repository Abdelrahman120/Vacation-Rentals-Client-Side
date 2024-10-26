import { TestBed } from '@angular/core/testing';

import { BookingAndBlocksService } from './booking-and-blocks.service';

describe('BookingAndBlocksService', () => {
  let service: BookingAndBlocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingAndBlocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
