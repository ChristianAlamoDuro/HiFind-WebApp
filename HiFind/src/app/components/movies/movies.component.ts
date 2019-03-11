import { Component, OnInit } from '@angular/core';
import { PublicMovieApiService } from 'src/app/services/public-movie-api.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public moviesTerror: Array<any> = [];
  public moviesScienceFiction: Array<any> = [];
  public moviesComedy: Array<any> = [];
  public categoryData: object;

  // Inicializamos los array con las peliculas que queremos mostrar en la seccion por defecto.
  constructor(
    public requestApi: PublicMovieApiService
  ) {
    this.moviesTerror = ['the nun', 'saw', 'The Conjuring'];
    this.moviesScienceFiction = ['Interstellar', 'Independence Day', 'Alita'];
    this.moviesComedy = ['american pie', 'champions', 'eurotrip'];
  }


  // Sobreescribimos los arrays con toda la informacion de cada peliculas, este array nos permite visualizarlos en la vista todos los datos
  ngOnInit() {
    this.moviesTerror = this.requestApi.getMovieArray(this.moviesTerror);
    this.moviesScienceFiction = this.requestApi.getMovieArray(this.moviesScienceFiction);
    this.moviesComedy = this.requestApi.getMovieArray(this.moviesComedy);
  }

}
