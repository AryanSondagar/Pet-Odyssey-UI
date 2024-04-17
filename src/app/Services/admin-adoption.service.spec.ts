import { TestBed } from '@angular/core/testing';

import { AdminAdoptionService } from './admin-adoption.service';

describe('AdminAdoptionService', () => {
  let service: AdminAdoptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAdoptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
