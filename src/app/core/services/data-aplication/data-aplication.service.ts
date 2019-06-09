import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AdminService } from '@services/admin/admin.service';
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

  createModal(type, title: string, text: string) {
    Swal.fire({
      type,
      title,
      text
    });
  }

  createToast(type, title: string) {
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

  createModalTwoOption() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
        );
      }
    });
  }
}
