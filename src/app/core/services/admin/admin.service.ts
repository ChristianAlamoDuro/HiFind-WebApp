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

    addGame(game) {
        const json = JSON.stringify(game);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'games', params, { headers });
    }

    getAllGames() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'games', { headers });
    }

    getGame(gameId) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + `games/${gameId}`, { headers });
    }

    getGamesForType(type: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'special_category_games/' + type, { headers });
    }

    deleteGame(data) {
        const json = JSON.stringify(data);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'delete/game', params, { headers });
    }

    addCategory(category) {
        const json = JSON.stringify(category);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'categories', params, { headers });
    }

    getAllCategories() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'categories', { headers });
    }

    getCategory(id: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'categories/' + id, { headers });
    }

    getCategoryType(type: string) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'categories/' + type, { headers });
    }

    deleteCategory(data: any) {
        const json = JSON.stringify(data);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'delete/category', params, { headers });
    }

    addActor(actor) {
        const json = JSON.stringify(actor);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'actors', params, { headers });
    }

    getAllActors() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'actors', { headers });
    }

    addDirector(director) {
        const json = JSON.stringify(director);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'directors', params, { headers });
    }

    getAllDirectors() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'directors', { headers });
    }

    getAllMovies() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'movies', { headers });
    }
}
