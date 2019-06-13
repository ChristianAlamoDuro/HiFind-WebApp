import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-show-all',
    templateUrl: './show-all.component.html',
    styleUrls: ['./show-all.component.sass']
})
export class ShowAllComponent implements OnInit, OnChanges {
    public data: any[];
    public typeToShow: string;
    public dataAplication;
    public userId: string;

    constructor(
        private adminService: AdminService,
        private dataService: DataAplicationService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private store: Store<any>
    ) {
        this.getDataAplication();
        this.getTypeToShow();
        this.getStore();
    }

    ngOnInit() {
        this.loadType();
        this.detectedChangeRoute();
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

    getDataAplication() {
        const self = this;

        self.dataService.getData()
            .subscribe(response => {
                self.dataAplication = response;
            });
    }

    getAllGames() {
        const self = this;

        this.adminService.getAllGames()
            .pipe(
                map(response => response['games'])
            )
            .subscribe(response => {

                this.data = response;
            });
    }

    getAllMovies() {
        const self = this;

        this.adminService.getAllMovies()
            .pipe(
                map(response => response['movies'])
            )
            .subscribe(response => {
                this.data = response;
            });
    }

    getAllActors() {
        const self = this;

        this.adminService.getAllActors()
            .pipe(
                map(response => response['actors'])
            )
            .subscribe(response => {
                this.data = response;
            });
    }

    getAllDirectors() {
        const self = this;

        this.adminService.getAllDirectors()
            .pipe(
                map(response => response['directors'])
            )
            .subscribe(response => {
                this.data = response;
            });
    }

    loadType() {
        this.data = [];

        switch (this.typeToShow) {
            case 'categories':
                this.getAllCategories();
                break;
            case 'games':
                this.getAllGames();
                break;
            case 'movies':
                this.getAllMovies();
                break;
            case 'directors':
                this.getAllDirectors();
                break;
            case 'actors':
                this.getAllActors();
                break;
            default:
                break;
        }
    }

    /**
     * Function to detect when route change
     */
    detectedChangeRoute(): void {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.loadType();
            }
        });
    }

    deleteCategory(id: string): void {
        const data = {
            id
        };

        this.adminService.deleteCategory(data)
            .pipe(
                finalize(() => {
                    this.data = [];
                    this.getAllCategories();
                })
            )
            .subscribe(response => {
                this.dataService.createModal('success', 'category delete', 'category has been deleted');
            },
            error => {
                this.dataService.createModal('error', 'Upps sorry', 'the category could not be deleted');
            });
    }

    deleteGame(id: string): void {
        const self = this;
        const data = {
            id,
            user_id: self.userId
        };

        this.adminService.deleteGame(data)
            .pipe(
                finalize(() => {
                    this.data = [];
                    this.getAllGames();
                })
            )
            .subscribe(response => {
                this.dataService.createModal('success', 'Game delete', 'Game has been deleted');
            },
            error => {
                this.dataService.createModal('error', 'Upps sorry', 'the Game could not be deleted');
            });
    }

    deleteActor(id: string): void {
        const self = this;
        const data = {
            id,
            user_id: self.userId
        };

        this.adminService.deleteActor(data)
            .pipe(
                finalize(() => {
                    this.data = [];
                    this.getAllActors();
                })
            )
            .subscribe(response => {
                this.dataService.createModal('success', 'Actor delete', 'Actor has been deleted');
            },
            error => {
                this.dataService.createModal('error', 'Upps sorry', 'The actor could not be deleted');
            });
    }

    deleteDirector(id: string): void {
        const self = this;
        const data = {
            id,
            user_id: self.userId
        };

        this.adminService.deleteDirector(data)
            .pipe(
                finalize(() => {
                    this.data = [];
                    this.getAllDirectors();
                })
            )
            .subscribe(response => {
                this.dataService.createModal('success', 'Director delete', 'Director has been deleted');
            },
            error => {
                this.dataService.createModal('error', 'Upps sorry', 'The director could not be deleted');
            });
    }

    deleteMovie(id: string): void {
        const self = this;
        const data = {
            id,
            user_id: self.userId
        };

        this.adminService.deleteMovie(data)
            .pipe(
                finalize(() => {
                    this.data = [];
                    this.getAllMovies();
                })
            )
            .subscribe(response => {
                this.dataService.createModal('success', 'Movie delete', 'Movie has been deleted');
            },
            error => {
                this.dataService.createModal('error', 'Upps sorry', 'The movie could not be deleted');
            });
    }


    delete(type: string, id: string) {
        switch (type) {
            case 'category':
                this.deleteCategory(id);
                break;
            case 'game':
                this.deleteGame(id);
                break;
            case 'movie':
                this.deleteMovie(id);
                break;
            case 'actor':
                this.deleteActor(id);
                break;
            case 'director':
                this.deleteDirector(id);
                break;
            default:
                break;
        }
    }
    ngOnChanges() {
        this.getTypeToShow();
        this.loadType();
    }

}
