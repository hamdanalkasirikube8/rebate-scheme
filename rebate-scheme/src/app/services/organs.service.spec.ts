import { TestBed } from '@angular/core/testing';

import { OrgansService } from './organs.service';

describe('OrgansService', () => {
  let service: OrgansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
