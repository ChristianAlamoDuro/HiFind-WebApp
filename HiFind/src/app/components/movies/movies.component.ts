import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublicMovieApiService } from 'src/app/services/public-movie-api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movieTitle: string;
  public moviesTerror: Array<any> = [];
  public moviesScienceFiction: Array<any> = [];
  public moviesComedy: Array<any> = [];
  public categoryData: object;
  constructor(
    public requestApi: PublicMovieApiService,
    public router: Router
  ) {
    this.moviesTerror = ['the nun', 'saw', 'The Conjuring'];
    this.moviesScienceFiction = ['Interstellar', 'Independence Day', 'Alita'];
    this.moviesComedy = ['american pie', 'champions', 'eurotrip'];
  }
  ngOnInit() {
    this.moviesTerror = this.requestApi.getMovieArray(this.moviesTerror);
    this.moviesScienceFiction = this.requestApi.getMovieArray(this.moviesScienceFiction);
    this.moviesComedy = this.requestApi.getMovieArray(this.moviesComedy);
  }
  // Funcion a la que se le pasa por parametros el titulo de la pelicula que en este momento se a
  // seleccionado y redirecciona a la ruta more-info pasandole por url ese titulo de pelicula
  moreInfo(movieTitle) {
    this.movieTitle = movieTitle;
    this.router.navigate(['/more-info/' + this.movieTitle]);
  }
}
