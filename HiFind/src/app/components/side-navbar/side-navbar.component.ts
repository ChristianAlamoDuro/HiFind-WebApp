import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from "../../services/data-aplication.service";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavBarComponent implements OnInit {

  public dataAplication;
  constructor(
    public dataService: DataAplicationService
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
      result =>{
        this.dataAplication = result;
      }
    );
  }
}
