import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavBarComponent implements OnInit {

  public dataAplication: any;
  public movies = false;
  public games = false;

  constructor(
    private dataService: DataAplicationService,
    private router: Router
  ) {
    this.getUrl();
    this.filterCategories();
  }
  ngOnInit() {
    this.getDataAplication();
  }

  filterCategories() {
    if (this.getUrl() === '/gamesPremium') {
      this.games = true;
    } else if (this.getUrl() === '/moviesPremium') {
      this.movies = true;
    }
  }
  /**
   * Function to get Url for side-navbar
   */
  getUrl() {
    return this.router.url;
  }

  /**
   * Function to get all data information
   */
  getDataAplication() {
    const self = this;

    self.dataService.getData()
      .subscribe(
        result => {
          self.dataAplication = result;
        }
      );
  }
}
