import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '../../services/data-aplication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public dataAplication;
  constructor(
    private dataService: DataAplicationService
  ) {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );
  }

  ngOnInit() {
  }

}
