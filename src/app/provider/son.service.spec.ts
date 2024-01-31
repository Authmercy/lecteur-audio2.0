import { TestBed } from '@angular/core/testing';

import { SonService } from './son.service';

describe('SonService', () => {
  let service: SonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
