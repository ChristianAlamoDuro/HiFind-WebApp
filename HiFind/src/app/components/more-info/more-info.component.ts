import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicMovieApiService } from '../../services/public-movie-api.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.css'],
  providers: [PublicMovieApiService]
})
export class MoreInfoComponent implements OnInit {
  public movieTitle: string;
  public movieInfo: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public publicApiMovies: PublicMovieApiService,
  ) {
    this.activatedRoute.params.subscribe(
      results => {
        this.movieTitle = results.title;
        // llamamos al metodo searchMovie y le pasamos el resultado del parametro obtenido por la url
        this.moreInfo(this.movieTitle);
      }
    );
  }

  ngOnInit() {
  }
  moreInfo(movieTitle: string) {
    this.publicApiMovies.getMovie(movieTitle).subscribe(
      results => {
        this.movieInfo = results;
      }
    );
  }
}
