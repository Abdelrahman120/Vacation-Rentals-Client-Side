import { TestBed } from '@angular/core/testing';

import { ChatRoomService } from './chat-room.service';

describe('ChatRoomService', () => {
  let service: ChatRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
