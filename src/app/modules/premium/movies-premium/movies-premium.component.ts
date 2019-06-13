import { Component, OnInit } from '@angular/core';
import { AdminService } from '@services/admin/admin.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-movies-premium',
    templateUrl: './movies-premium.component.html',
    styleUrls: ['./movies-premium.component.sass']
})
export class MoviesPremiumComponent implements OnInit {

    public data: any;
    public userId: string;

    constructor(
        private adminService: AdminService,
        private store: Store<any>
    ) {
        this.getStore();
    }

    ngOnInit() {
        this.getAllMovies();
    }

    getAllMovies() {
        const self = this;

        this.adminService.getAllMovies()
            .pipe(
                map(response => response['movies'])
            )
            .subscribe(response => {
                console.log(response);
                this.data = response;
            });
    }

    getStore() {
        const self = this;

        self.store.pipe(
          map(value => {
            return value.state['userData'];
          })
        )
        .subscribe(response => {
           self.userId = response.sub;
        });
    }

}
