import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { map, finalize } from 'rxjs/operators';
import { Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';


@Component({
    selector: 'app-search-premium',
    templateUrl: './search-premium.component.html',
    styleUrls: ['./search-premium.component.scss'],
    providers: [AdminService]
})


export class SearchPremiumComponent implements OnInit {

    public gameTitle: string;
    public searchTitle: string;
    public gameResult: Array<any> = [];
    public movieResult: Array<any> = [];
    public actorsResults: Array<any> = [];
    public directorsResults: Array<any> = [];
    public result: boolean;
    public dataAplication;
    public categories: string [];
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
    public title: string;
    public filmProducer: string;
    public movieId: string;
    public directors: string;
    public actors: string;
    public userId: string;
    public biography: string;
    public birthday; string;
    public movies: any;
    public surname: string;
    public actorDirectorId: string;
    public load = false;
    public notFound = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private adminService: AdminService,
        private router: Router,
        private dataService: DataAplicationService,
        private formBuilder: FormBuilder,
        private store: Store<any>,
        private dataAplicationService: DataAplicationService
    ) {
        this.dataService.getData().subscribe(
            result => {
                this.dataAplication = result;
            }
        );
        this.activatedRoute.params.subscribe(
            results => {
                this.getUrl();
                this.searchGames();
            }
        );
    }
    ngOnInit() {
        this.getStore();
        this.createForm();
    }

    getUrl() {
        this.searchTitle = this.activatedRoute.snapshot.paramMap.get('name');
    }

    createForm() {
        this.formMark = this.formBuilder.group({
            mark: [
                this.mark,
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

    searchGames() {
        this.adminService.getByName('games', this.searchTitle)
            .pipe(
                map(data => data['games']),
                finalize(() => this.searchMovies())
            )
            .subscribe(
                results => {
                    console.log(results);
                    this.gameResult = results;
                }
            );
    }

    searchMovies() {
        this.adminService.getByName('movies', this.searchTitle)
            .pipe(
                map(data => data['movies']),
                finalize(() => this.searchActor())
            )
            .subscribe(
                results => {
                    console.log(results);
                    this.movieResult = results;
                }
            );
    }

    searchActor() {
        this.adminService.getByName('actors', this.searchTitle)
            .pipe(
                map(data => data['actors']),
                finalize(() => this.searchDirectors())
            )
            .subscribe(
                results => {
                    console.log(results);
                    this.actorsResults = results;
                }
            );
    }

    searchDirectors() {
        this.adminService.getByName('directors', this.searchTitle)
            .pipe(
                map(data => data['directors']),
                finalize(() =>  this.load = true)
            )
            .subscribe(
                results => {
                    console.log(results);
                    this.directorsResults = results;
                    console.log(this.actorsResults);
                    console.log(this.directorsResults);
                    console.log(this.movieResult);
                    console.log(this.gameResult);
                    
                    
                }
            );
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

    takeInfomationActorOrDirector(data) {
        this.movies = [];
        this.biography = data.biography;
        this.birthday = data.birthday;
        for (const movie of data.movies) {
            this.movies.push(movie.title);
        }
        this.movies = this.movies.join(', ');
        console.log(this.movies);
        this.surname = data.surname;
        this.image = data.image;
        this.actorDirectorId = data.id;
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
        this.searchGames();
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
        this.searchGames();
        document.getElementById('modal-marks-movies').click();
    }
}
