import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = 'http://localhost/HiFind-Api/public/api/';
  }

  addCategory(categoryName) {
    const json = JSON.stringify(categoryName);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'categories', params, {headers});
  }

  addGame(game) {
    const json = JSON.stringify(game);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'games', params, {headers});
  }

  getAllCategories() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'categories', {headers});
  }

  getAllGames() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(this.url + 'games', {headers});
  }
}
