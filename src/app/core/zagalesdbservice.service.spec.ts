import { TestBed } from '@angular/core/testing';

import { ZagalesdbserviceService } from './zagalesdbservice.service';

describe('ZagalesdbserviceService', () => {
  let service: ZagalesdbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZagalesdbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
