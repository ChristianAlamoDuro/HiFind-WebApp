import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '../../services/data-aplication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email: string;
  public password: string;
  public username: string;
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
