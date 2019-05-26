import { Component, OnInit } from '@angular/core';
import { AdminService } from '@services/admin/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit {
  
  public data: any;
  public typeToShow: string;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getTypeToShow();
   }

  ngOnInit() {
    this.loadType();
  }

  /**
   * Function to get all categories
   */
  getAllCategories() {
    const self = this;

    this.adminService.getAllCategories()
      .pipe(
        map(response => {
          return response['categories'];
        })
      )
      .subscribe(response => {
        console.log(response);
        
        this.data = response;
      });
  }

  /**
   * Function to get url params
   */
  getTypeToShow() {
    const self = this;

    self.activatedRoute.params.subscribe(
      response => {
        self.typeToShow = response.type;
      }
    );
  }

  getAllGames() {
    const self = this;

    this.adminService.getAllGames()
      .pipe(
        map(response => {
          console.log(response);
          
          return response['Games'];
        })
      )
      .subscribe(response => {
        console.log(response);
        this.data = response;
      });
  }

  loadType() {
    if (this.typeToShow === 'categories') {
      this.getAllCategories();
    } else if (this.typeToShow === 'games') {
      this.getAllGames();
    }
  }



}
