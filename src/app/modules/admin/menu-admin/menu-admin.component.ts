import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.sass']
})
export class MenuAdminComponent implements OnInit {

  public dataAplication: any;

  constructor(
    private dataService: DataAplicationService
  ) {
    this.getDataAplication();
  }

  ngOnInit() {
  }

  getDataAplication() {
    const self = this;

    self.dataService.getData()
    .subscribe(response => {
      self.dataAplication = response;
    });
  }

}
