import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserClientService } from '@services/user-client/userClient.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class GuardGuard implements CanActivate {

    public userData;

    constructor(
        private store: Store<any>,
        private router: Router
    ) {
      this.getStore();
    }

    canActivate() {
        if (this.userData.role && this.userData.role === 'ROLE_ADMIN') {
            return true;
        } else if (this.userData.role && this.userData.role === 'ROLE_USER') {
            this.router.navigate(['/homePremium']);
            return false;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
    }

    getStore() {
        const self = this;

        self.store.pipe(
          map(value => {
            return value.state;
          })
        )
        .subscribe(response => {
          if (typeof(response.userData) !== 'string' ) {
            self.userData = response.userData;
          } else {
            this.userData = 'not logged';
          }
        });
      }

}
