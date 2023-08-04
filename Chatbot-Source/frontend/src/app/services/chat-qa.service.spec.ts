import { TestBed } from '@angular/core/testing';

import { ChatQAService } from './chat-qa.service';

describe('ChatQAService', () => {
  let service: ChatQAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatQAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
