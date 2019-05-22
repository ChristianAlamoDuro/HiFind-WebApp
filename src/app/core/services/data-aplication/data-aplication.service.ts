import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
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

  createModal(title: string, message: string, type: any) {
    Swal.fire({
      type,
      title,
      text: message
    });
  }

  createToastTop(type: any, title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });

    Toast.fire({
      type,
      title
    });
  }
}
