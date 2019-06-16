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
        this.url = 'http://localhost/tfc/HiFind-Api/server.php/api/';
    }

    addGame(game, image) {
        const json = JSON.stringify(game);
        const params = new FormData();
        params.append('json', json);
        params.append('image', image);

        return this.http.post(this.url + 'games', params);
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

    addActor(actor, image) {
        const json = JSON.stringify(actor);
        const params = new FormData();
        params.append('json', json);
        params.append('image', image);

        return this.http.post(this.url + 'actors', params);
    }

    getAllActors() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'actors', { headers });
    }

    getActor(id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'actors/' + id, { headers });
    }

    deleteActor(data) {
        const json = JSON.stringify(data);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'delete/actor', params, { headers });
    }

    addDirector(director, image) {
        const json = JSON.stringify(director);
        const params = new FormData();
        params.append('json', json);
        params.append('image', image);

        return this.http.post(this.url + 'directors', params);
    }

    getAllDirectors() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'directors', { headers });
    }

    getDirector(id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'directors/' + id, { headers });
    }

    deleteDirector(data) {
        const json = JSON.stringify(data);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'delete/director', params, { headers });
    }

    addMovie(movie, image) {
        const json = JSON.stringify(movie);
        const params = new FormData();
        params.append('json', json);
        params.append('image', image);

        return this.http.post(this.url + 'movies', params);
    }

    getAllMovies() {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'movies', { headers });
    }

    getMovie(id) {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.get(this.url + 'movies/' + id, { headers });
    }

    deleteMovie(data) {
        const json = JSON.stringify(data);
        const params = 'json=' + json;
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.url + 'delete/movie', params, { headers });
    }
}
