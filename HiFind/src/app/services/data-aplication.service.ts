import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataAplicationService {

  public url: string;
  public response: string;
  constructor(
    public http: HttpClient

  ) {
    this.url = './assets/data.json';
    this.response = 'json';
  }

  getData() {
    return this.http.get(this.url);
  }
}
