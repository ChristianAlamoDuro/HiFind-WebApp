import { Component, OnInit } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-home-premium',
    templateUrl: './home-premium.component.html',
    styleUrls: ['./home-premium.component.sass']
})
export class HomePremiumComponent implements OnInit {

    public data;
    public categoryType;
    public userId: string;
    public categories: string[];
    public name: string;
    public outDate: string;
    public publicDirected: string;
    public sinopsis: string;
    public image: string;
    public marks: any;
    public gameId: string;
    public duration: string;
    public formMark: any;
    public mark: any;
    public dataGames: any;
    public dataMovies: any;
    public categoryGames: any;
    public categoryMovies: any;

    constructor(
        private adminService: AdminService,
        private dataAplicationService: DataAplicationService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>,
        private formBuilder: FormBuilder,
    ) {
        this.categoryMovies = [];
        this.categoryGames = [];
        this.dataGames = [];
        this.dataMovies = [];
        this.getStore();
    }

    ngOnInit() {
        this.getCategoryType();
        this.detectedChangeRoute();
        this.createForm();
    }

    createForm() {
        this.formMark = this.formBuilder.group({
            mark: [
                this.mark,
                Validators.compose([Validators.required, Validators.maxLength(2), Validators.max(10), Validators.min(1)])
            ],
        });
    }

    detectedChangeRoute(): void {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.initializeData();
            }
        });
    }

    getCategoryType(): void {

        this.adminService.getCategoryType('is_special_game')
            .pipe(
                map(data => data['category']),
                finalize(() => this.initializeData())
            )
            .subscribe(response => {
                for (const category of response) {
                    this.categoryGames.push(category.name);
                }
            });

        this.adminService.getCategoryType('is_special_movie')
            .pipe(
                map(data => data['category']),
            )
            .subscribe(response => {
                for (const category of response) {
                    this.categoryMovies.push(category.name);
                }
            });
    }
    initializeData() {
        this.dataGames = [];
        this.dataMovies = [];
        this.categoryType = this.route.snapshot.paramMap.get('type');

        if (this.categoryType) {
            console.log(this.categoryType);
            console.log(this.categoryMovies.includes(this.categoryType));
            console.log(this.categoryGames.includes(this.categoryType));
            if (this.categoryGames.includes(this.categoryType)) {
                console.log(1);
                this.getCategoriesGame(this.categoryType);
            }
            if (this.categoryMovies.includes(this.categoryType)) {
                console.log(2);
                this.getCategoriesMovie(this.categoryType);
            }
        } else {
            this.getSpecialGames();
            this.getSpecialMovies();
        }
    }

    getSpecialMovies() {
        const self = this;

        this.adminService.getGamesForType('special_category_movies', 'is_special_movie')
            .pipe(
                map(data => data['movies'])
            )
            .subscribe(response => {
                this.dataMovies = response;
            });
    }

    getSpecialGames() {
        this.adminService.getGamesForType('special_category_games', 'is_special_game')
            .pipe(
                map(data => data['Games'])
            )
            .subscribe(response => {
                this.dataGames = response;
            });
    }

    getCategoriesGame(type) {
        this.adminService.getGamesForType('category_games', type)
            .pipe(
                map(data => data['Games'])
            )
            .subscribe(response => {
                this.dataGames = response;
            });
    }

    getCategoriesMovie(type) {
        this.adminService.getGamesForType('category_movie', type)
            .pipe(
                map(data => data['movies'])
            )
            .subscribe(response => {
                this.dataMovies = response;
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

    takeInformation(game) {
        this.name = game.name;
        this.categories = game.categories.join(', ');
        this.outDate = game.out_date;
        this.publicDirected = game.public_directed;
        this.duration = game.duration;
        this.sinopsis = game.sinopsis;
        this.image = game.image;
        this.marks = game.marks;
        this.gameId = game.id;
    }

    onSubmit(form) {
        const data = {
            mark: form.value.mark,
            user_id: this.userId,
            game_id: this.gameId
        };

        this.adminService.mark('mark_game', data)
            .subscribe(response => {
                if (response['status'] !== 'error') {
                    this.dataAplicationService.createModal('success', 'Success', 'Thank for rate this game');
                } else {
                    this.dataAplicationService.createModal('Error', 'Ups', 'Sorry you can\'t rate this game');
                }
            });
        form.reset();
        document.getElementById('modal-marks').click();
        this.initializeData();
    }
}
