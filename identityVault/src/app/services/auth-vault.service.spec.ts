import { TestBed } from '@angular/core/testing';

import { AuthVaultService } from './auth-vault.service';

describe('AuthVaultService', () => {
  let service: AuthVaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthVaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
