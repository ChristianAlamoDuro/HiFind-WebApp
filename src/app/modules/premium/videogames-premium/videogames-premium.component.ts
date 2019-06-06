import { Component, OnInit } from '@angular/core';
import { AdminService } from '@services/admin/admin.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-videogames-premium',
  templateUrl: './videogames-premium.component.html',
  styleUrls: ['./videogames-premium.component.css']
})
export class VideogamesPremiumComponent implements OnInit {

  public data;
  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.getAllGames();
  }

  getAllGames() {
    const self = this;

    this.adminService.getAllGames()
        .pipe(
            map(response => {
                console.log(response);

                return response['games'];
            })
        )
        .subscribe(response => {
            console.log(response);
            this.data = response;
        });
}

}
