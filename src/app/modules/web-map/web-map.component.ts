import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
@Component({
  selector: 'app-web-map',
  templateUrl: './web-map.component.html',
  styleUrls: ['./web-map.component.sass']
})
export class WebMapComponent implements OnInit {
  public dataAplication;
  constructor(public dataService: DataAplicationService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;

        console.log(this.dataAplication);
      }
    );
  }
}
