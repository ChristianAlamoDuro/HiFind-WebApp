import { Component, OnInit } from '@angular/core';
import { AdminService } from '@services/admin/admin.service';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-videogames-premium',
    templateUrl: './videogames-premium.component.html',
    styleUrls: ['./videogames-premium.component.sass']
})
export class VideogamesPremiumComponent implements OnInit {

    public data;
    public categoryType;
    public userId: string;

    constructor(
        private adminService: AdminService,
        private route: ActivatedRoute,
        private store: Store<any>
    ) {
        this.getStore();
    }

    ngOnInit() {
        this.initializeData();
    }

    initializeData() {
        this.categoryType = this.route.snapshot.paramMap.get('type');
        if (this.categoryType) {
        } else {
            this.getAllGames();
        }
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

    getCategoriesGame(type) {
        // this.adminService.get(type)
        //     .subscribe(response => {
        //         console.log(response);
        //     });
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
