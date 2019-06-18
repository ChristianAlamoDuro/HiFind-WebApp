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
    public dataGames: any;
    public dataMovies: any;
    public categoryGames: any;
    public categoryMovies: any;
    public title: string;
    public filmProducer: string;
    public movieId: string;
    public directors: string;
    public actors: string;

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
                this.marks,
                Validators.compose([
                    Validators.required,
                    Validators.maxLength(2),
                    Validators.max(10),
                    Validators.min(1),
                    Validators.pattern('[1-9]{1}0?')
                ])
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
            )
            .subscribe(response => {
                for (const category of response) {
                    this.categoryGames.push(category.name);
                }
            });

        this.adminService.getCategoryType('is_special_movie')
            .pipe(
                map(data => data['category']),
                finalize(() => this.initializeData())
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

    takeInformationGame(game) {
        console.log(game);
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

    takeInformationMovie(movie) {
        this.title = movie.title;
        this.categories = movie.categories.join(', ');
        this.actors = movie.actors.join(', ');
        this.directors = movie.directors.join(', ');
        this.outDate = movie.out_date;
        this.publicDirected = movie.public_directed;
        this.duration = movie.duration;
        this.sinopsis = movie.sinopsis;
        this.image = movie.image;
        this.marks = movie.marks;
        this.movieId = movie.id;
        this.filmProducer = movie.film_producer;
    }

    onSubmitGame(form) {
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
        this.getCategoryType();
        document.getElementById('modal-marks-games').click();
    }

    onSubmitMovie(form) {
        const data = {
            mark: form.value.mark,
            user_id: this.userId,
            movie_id: this.movieId
        };

        this.adminService.mark('mark_movie', data)
            .subscribe(response => {
                if (response['status'] !== 'error') {
                    this.dataAplicationService.createModal('success', 'Success', 'Thank for rate this movie');
                } else {
                    this.dataAplicationService.createModal('Error', 'Ups', 'Sorry you can\'t rate this movie');
                }
            });
        form.reset();
        this.getCategoryType();
        document.getElementById('modal-marks-movies').click();
    }
}
