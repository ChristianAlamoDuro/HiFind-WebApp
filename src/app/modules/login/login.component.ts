import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { User } from '../../shared/models/user';
import { UserClientService } from '@services/user-client/userClient.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public dataAplication: any;
  public user: any;
  public userData: any;
  public status: boolean;
  public token: string;

  constructor(
    private dataService: DataAplicationService,
    private userClienteService: UserClientService
  ) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );
  }

  /**
   * Function for valid form
   * @param form
   */
  onSubmit(form: any) {
    this.userData = form.value;
    this.userClienteService.signUp(this.userData).subscribe(response => {
      this.status = true;
      this.token = response;
      this.saveDataLocalStorage();
    },
    error => {
      this.status = false;
      console.log(error);
    });
  }

  /**
   * Function for get Token and user data
   */
  saveDataLocalStorage() {
    this.userClienteService.signUp(this.userData, true).subscribe(data => {
      this.user = data;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    error => {
      this.status = false;
      console.log(error);
    });
  }

}
