import { Component, OnInit } from '@angular/core';
import { PublicMovieApiService } from '@services/public-movie-api/public-movie-api.service';
import { Router } from '@angular/router';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [PublicMovieApiService]
})
export class NavbarComponent implements OnInit {
  // nombre de la variable que obtendremos del input de busqueda
  public movieName: string;
  public dataAplication;
  // creamos la variable requestService de tipo publicMovieApiService
  constructor(
    private requestService: PublicMovieApiService,
    private router: Router,
    private dataService: DataAplicationService
  ) {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );
  }

  ngOnInit() {
  }
  // Realizamos una peticion a la api para obterner la información de la busqueda introducida en la barra de busqueda
  searchMovie() {
    this.router.navigate(['/searchResults/' + this.movieName]);
    this.movieName = '';
  }
}
