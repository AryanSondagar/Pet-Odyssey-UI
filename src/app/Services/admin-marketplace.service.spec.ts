import { TestBed } from '@angular/core/testing';

import { AdminMarketplaceService } from './admin-marketplace.service';

describe('AdminMarketplaceService', () => {
  let service: AdminMarketplaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMarketplaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
