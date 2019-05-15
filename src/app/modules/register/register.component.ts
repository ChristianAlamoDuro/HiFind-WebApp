import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { User } from '../../shared/models/user';
import { UserClientService } from '@services/user-client/userClient.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User;
  public dataAplication;

  constructor(
    private dataService: DataAplicationService,
    private userService: UserClientService
  ) { }
x
  ngOnInit() {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );

    this.user = new User(1, '', '', '', '');
  }

  onSubmit(form) {
    this.userService.register(this.user)
      .subscribe(response => {
        console.log(response);
        form.reset();
      },
      error => {
        console.log(error);
      });
  }

}
