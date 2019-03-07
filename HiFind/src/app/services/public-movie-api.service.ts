import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicMovieApiService {
  public url: string;
  constructor(
    public http: HttpClient
  ) {
    this.url = 'https://www.omdbapi.com/?apikey=410641ea';
  }
  // Funcion que realiza una peticion para obtener la informacion de la api sobre todas las ocurrencias buscadas devuelve json
  getAllMovie(movieName: string): Observable<any> {
    return this.http.get(this.url + '&s=' + movieName);
  }
  // Función que realiza una peticion para obtener la información sobre una película devuelve json
  getMovie(movieName: string): Observable<any> {
    return this.http.get(this.url + '&t=' + movieName);
  }
  // Funcion que hace una peticion para obtener informacion sobre una pelicula tantas veces como posiciones en el array
  getMovieArray(movieParam: Array<string>) {
    const movieArray: Array<any> = [];
    for (const iterator of movieParam) {
      this.getMovie(iterator).subscribe(
        result => {
          // se guarda el resultado de la busqueda en una posicion del array
          movieArray.push(result);
        },
        err => {
          console.log(err);
        }
      );
    }
    return movieArray;
  }
}