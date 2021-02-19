import { TestBed } from '@angular/core/testing';

import { ZagalescrudService } from './zagalescrud.service';

describe('ZagalescrudService', () => {
  let service: ZagalescrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZagalescrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
