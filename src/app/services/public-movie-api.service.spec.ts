import { TestBed } from '@angular/core/testing';

import { PublicMovieApiService } from './public-movie-api.service';

describe('PublicMovieApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicMovieApiService = TestBed.get(PublicMovieApiService);
    expect(service).toBeTruthy();
  });
});
