import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-show-all',
    templateUrl: './show-all.component.html',
    styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent implements OnInit, OnChanges {
    public data: any;
    public typeToShow: string;
    public dataAplication;

    constructor(
        private adminService: AdminService,
        private dataService: DataAplicationService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.getDataAplication();
        this.getTypeToShow();
    }

    ngOnInit() {
        this.loadType();
        this.detectedChangeRoute();
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

    acceptReject() {
        this.dataService.createModalTwoOption();
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

    loadType() {
        if (this.typeToShow === 'categories') {
            this.getAllCategories();
        } else if (this.typeToShow === 'games') {
            this.getAllGames();
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
    ngOnChanges() {
        this.getTypeToShow();
        this.loadType();
    }

}
