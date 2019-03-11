import { TestBed } from '@angular/core/testing';

import { DataAplicationService } from './data-aplication.service';

describe('DataAplicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataAplicationService = TestBed.get(DataAplicationService);
    expect(service).toBeTruthy();
  });
});
