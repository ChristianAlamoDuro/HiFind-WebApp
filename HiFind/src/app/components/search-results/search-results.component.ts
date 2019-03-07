import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicMovieApiService } from '../../services/public-movie-api.service';
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
  providers: [PublicMovieApiService]
})
export class SearchResultsComponent implements OnInit {
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
        this.searchMovies(this.searchTitle);
      }
    );
  }
  ngOnInit() {
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
