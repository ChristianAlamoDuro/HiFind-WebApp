import { TestBed } from '@angular/core/testing';

import { UserClientService } from './userClient.service';

describe('User.ClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserClientService = TestBed.get(UserClientService);
    expect(service).toBeTruthy();
  });
});
