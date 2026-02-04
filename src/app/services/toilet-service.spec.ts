import { TestBed } from '@angular/core/testing';

import { ToiletService } from './toilet-service';

describe('ToiletService', () => {
  let service: ToiletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToiletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
