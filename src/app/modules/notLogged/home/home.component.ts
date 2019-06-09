import { Component, OnInit } from '@angular/core';
import { PublicMovieApiService } from '@services/public-movie-api/public-movie-api.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [PublicMovieApiService]
})
export class HomeComponent implements OnInit {
  // Variable movieName guardamos las películas de las cuales queremos mostrar la información
  // En la variable topMovies guardamos la información que devuelve la consulta a la api de peliculas
  public movieName: Array<string>;
  public topMovies: Array<string>;
  public dataAplication;
  // En el constructor creamos la variables requestService de tipo publicMovieService
  constructor(
    private requestService: PublicMovieApiService,
    private dataService: DataAplicationService

  ) {
    this.movieName = ['Mr. Nobody', 'Green mile', 'Pulp fiction', 'the godfather'];
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );
  }
  // Al cargar la pagina se hara la peticion a la api y rellenará la variable topMovies con el json
  ngOnInit() {
    this.topMovies = this.requestService.getMovieArray(this.movieName);
  }
}
