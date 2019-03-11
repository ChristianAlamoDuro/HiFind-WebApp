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
    // Inicializamos en el constructor una variable de tipo activatedRouted
    public activatedRoute: ActivatedRoute,
    public publicApiMovies: PublicMovieApiService,
  ) {
    // Sacamos la variable que le hemos pasado por parametros
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
  // Función a la que se le pasa por parametro el título de la pélicula y hace la llamada a la api llamando a la funcion
  // getmovie para obtener la información de esa pelicula
  moreInfo(movieTitle: string) {
    this.publicApiMovies.getMovie(movieTitle).subscribe(
      results => {
        // guardamos en movieInfo lo que nos devuelve la api
        this.movieInfo = results;
      }
    );
  }
}
