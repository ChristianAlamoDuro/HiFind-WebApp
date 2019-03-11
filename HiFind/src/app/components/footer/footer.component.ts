import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '../../services/data-aplication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public dataAplication;
  public currentYear;
  constructor(
    public dataService: DataAplicationService
  ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit() {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;
      }
    );
  }
}
