import { Component, OnInit } from '@angular/core';
import { PublicMovieApiService } from '@services/public-movie-api/public-movie-api.service';
import { Router } from '@angular/router';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { HelperService } from '@services/helper/helper.service';
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
  public user: any;
  // creamos la variable requestService de tipo publicMovieApiService
  constructor(
    private requestService: PublicMovieApiService,
    private router: Router,
    private dataService: DataAplicationService,
    private store: Store<any>,
    private helperService: HelperService
  ) {
    this.getStore();
    this.getContentData();
  }

  ngOnInit() {
  }
  // Realizamos una peticion a la api para obterner la información de la busqueda introducida en la barra de busqueda
  searchMovie() {
    this.router.navigate(['/searchResults/' + this.movieName]);
    this.movieName = '';
  }

  getContentData() {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );
  }

  getStore() {
    const self = this;

    self.store.pipe(
      map(value => {
        return value.state;
      })
    )
    .subscribe(response => {
      if (typeof(response.userData) !== 'string' ) {
        self.saveUserData(response);
      } else {
        this.user = 'not logged';
      }
    });
  }

  saveUserData(userData) {
    this.user = userData;
    console.log(this.user);
  }

  logOut() {
    this.helperService.dispatchLogOut();
  }
}
