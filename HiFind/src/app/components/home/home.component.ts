import { Component, OnInit } from '@angular/core';
import { PublicMovieApiService } from '../../services/public-movie-api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PublicMovieApiService]
})
export class HomeComponent implements OnInit {
  // Variable movieName guardamos las películas de las cuales queremos mostrar la información
  // En la variable topMovies guardamos la información que devuelve la consulta a la api de peliculas
  public movieName: Array<string>;
  public topMovies: Array<string>;
  // En el constructor creamos la variables requestService de tipo publicMovieService
  constructor(
    public requestService: PublicMovieApiService,
  ) {
    this.movieName = ['fight club', 'superman returns', 'thor', 'the mask'];
  }
  // Al vargar la pagina se hara la peticion a la api y rellenará la variable topMovies con el json
  ngOnInit() {
    this.topMovies = this.requestService.getMovieArray(this.movieName);
  }
}
