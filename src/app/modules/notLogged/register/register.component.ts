import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { User } from '@models/user';
import { UserClientService } from '@services/user-client/userClient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public dataAplication;

  constructor(
    private dataService: DataAplicationService,
    private userService: UserClientService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );

    this.user = new User(1, '', '', '', '');
  }

  onSubmit(form) {
    const self = this;
    this.userService.register(this.user)
      .subscribe(response => {
        console.log(response);
        form.reset();
        self.dataService.createModal('success', 'Successfull', 'Acount create successfull');
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      });
  }

}
