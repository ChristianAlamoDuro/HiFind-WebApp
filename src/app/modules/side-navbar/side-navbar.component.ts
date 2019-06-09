import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { Router } from '@angular/router';
import { AdminService } from '@services/admin/admin.service';
import { map, finalize } from 'rxjs/operators';

@Component({
    selector: 'app-side-navbar',
    templateUrl: './side-navbar.component.html',
    styleUrls: ['./side-navbar.component.sass']
})
export class SideNavBarComponent implements OnInit {

    public dataAplication: any;
    public movies = false;
    public games = false;
    public categoriesGames: any[];
    public categoryMovies: any[];
    public url: string;

    constructor(
        private dataService: DataAplicationService,
        private router: Router,
        private adminService: AdminService
    ) {
        this.getUrl();
        this.categoriesGames = [];
        this.categoryMovies = [];
        this.filterCategories();
    }
    ngOnInit() {
        this.getDataAplication();
    }

    filterCategories() {
        this.getUrl();
        if (this.url === 'gamesPremium') {
            this.games = true;
            this.getCategoryType('is_game');
        } else if (this.url === 'moviesPremium') {
            this.movies = true;
            this.getCategoryType('is_movie');
        } else {
            this.getCategoryType('is_special_movie');
            this.getCategoryType('is_special_game');
        }
    }
    /**
     * Function to get Url for side-navbar
     */
    getUrl() {
        this.url = this.router.url;
        this.url = this.url.split('/')[1];
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

    getCategoryType(type: string): void {
        this.adminService.getCategoryType(type)
            .pipe(
                map(data => data['category']),
            )
            .subscribe(response => {
                for (const category of response) {
                    if (type === 'is_special_game' || type === 'is_game') {
                        this.categoriesGames.push(category.name);
                    } else if (type === 'is_special_movie' || type === 'is_movie') {
                        this.categoryMovies.push(category.name);
                    }
                }
            });
    }
}
