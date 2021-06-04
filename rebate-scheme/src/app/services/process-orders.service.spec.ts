import { TestBed } from '@angular/core/testing';

import { ProcessOrdersService } from './process-orders.service';

describe('ProcessOrdersService', () => {
  let service: ProcessOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
