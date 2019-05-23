import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GetUser, Logout, Login } from '@core/actions/actions';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private store: Store<any>
  ) { }

  initialInformation() {
    const userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : 'User not logged';

    this.store.dispatch(new GetUser(userData));
  }

  dispatchLogin() {
    const userData = JSON.parse(localStorage.getItem('user'));

    this.store.dispatch(new Login(userData));
  }

  dispatchLogOut() {
    const userData = 'User not logged';

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.store.dispatch(new Logout(userData));
  }
}
