import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { UserClientService } from '@services/user-client/userClient.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HelperService } from '@services/helper/helper.service';

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
    private userClienteService: UserClientService,
    private store: Store<any>,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getContentData();
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
    const self = this;

    self.userClienteService.signUp(self.userData, true).subscribe(data => {
      if (data.status !== 'error') {
        self.user = data;
        sessionStorage.setItem('token', self.token);
        sessionStorage.setItem('user', JSON.stringify(self.user));
        console.log(this.user);
        self.helperService.dispatchLogin();
        self.dataService.createModal('success', 'Login successfull', 'Now you can use our premium apis');
        if (this.user.role === 'ROLE_ADMIN') {
          this.router.navigate(['/adminShow/games']);
        } else {
          this.router.navigate(['/homePremium']);
        }
      } else {
        self.dataService.createModal('error', 'Login fail', 'Your email or password are incorrent');
      }
    },
    error => {
      this.status = false;
      console.log(error);
    });
  }

  getContentData() {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );
  }

  dispatchLogin() {

  }

}
