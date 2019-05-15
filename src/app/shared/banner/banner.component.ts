import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

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
