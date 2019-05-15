import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserClientService {

  public url: string;
  constructor(
    public http: HttpClient
  ) {
    this.url = 'http://hifind-api.com/';
  }

  register(user) {
    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'users/register', params, {headers});
  }

  signUp(user, getToken = null): Observable<any> {
    if (getToken != null) {
      user.getToken = 'true';
    }

    const json = JSON.stringify(user);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(this.url + 'users/login', params, {headers});
  }
}
