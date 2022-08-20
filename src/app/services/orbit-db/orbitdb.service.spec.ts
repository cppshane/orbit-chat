import { TestBed } from '@angular/core/testing';

import { OrbitdbService } from './orbitdb.service';

describe('OrbitdbService', () => {
  let service: OrbitdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrbitdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
