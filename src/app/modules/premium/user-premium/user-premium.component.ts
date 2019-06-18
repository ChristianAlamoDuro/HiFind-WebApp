import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-premium',
  templateUrl: './user-premium.component.html',
  styleUrls: ['./user-premium.component.sass']
})
export class UserPremiumComponent implements OnInit {
  
  public userEmail: string;
  public userName: string;
  public userRole: string;

  constructor(
    private store: Store<any>) { }

  ngOnInit() {
    this.getStore();
  }

  getStore() {
    const self = this;

    self.store.pipe(
      map(value => {
        return value.state['userData'];
      })
    )
      .subscribe(response => {
        self.userEmail = response.email;
        self.userName = response.username;
        self.userRole = response.role;
      });
  }

}
