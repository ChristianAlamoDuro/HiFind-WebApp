import { Component, OnInit } from '@angular/core';
import { PublicMovieApiService } from '../../services/public-movie-api.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [PublicMovieApiService]
})
export class NavbarComponent implements OnInit {
  // nombre de la variable que obtendremos del input de busqueda
  public movieName: string;
  // creamos la variable requestService de tipo publicMovieApiService
  constructor(
    public requestService: PublicMovieApiService,
  ) {

  }

  ngOnInit() {
  }
  // Realizamos una peticion a la api para obterner la información de la busqueda introducida en la barra de busqueda
  loadMovie() {
    this.requestService.getAllMovie(this.movieName).subscribe(
      result => {
        this.movieName = result;
        this.movieName = '';
      }
    );
  }
}
