import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicMovieApiService } from '../../services/public-movie-api.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, DoCheck {
  public searchTitle: string;
  public movieResult: Array<any>;
  public result: boolean;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public publicApiMovies: PublicMovieApiService
  ) {
    this.activatedRoute.params.subscribe(
      results => {
        this.searchTitle = results.title;
      }
    );
  }

  ngOnInit() {
    this.searchMovies(this.searchTitle);
  }
  ngDoCheck() {
    let aux: string;
    this.activatedRoute.params.subscribe(
      params => {
        aux = params['titulo'];
      }
    );
    if (aux !== this.searchTitle) {
      this.activatedRoute.params.subscribe(
        params => {
          this.searchTitle = params['titulo'];
        }
      );
      this.searchMovies(this.searchTitle);
    }
  }

  searchMovies(title: string) {
    this.result = false;
    this.movieResult = [''];
    this.publicApiMovies.getMoviesSearch(title).subscribe(
      results => {
        console.log(results);
      }
    );
  }

}
