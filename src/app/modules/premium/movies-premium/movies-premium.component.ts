import { Component, OnInit } from '@angular/core';
import { AdminService } from '@services/admin/admin.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-movies-premium',
    templateUrl: './movies-premium.component.html',
    styleUrls: ['./movies-premium.component.sass']
})
export class MoviesPremiumComponent implements OnInit {

    public data: any;
    public userId: string;
    public title: string;
    public categories: string[];
    public actors: string[];
    public directors: string[];
    public outDate: string;
    public publicDirected: string;
    public duration: string;
    public sinopsis: string;
    public image: string;
    public marks: string[];
    public movieId: string;
    public filmProducer: string;
    public categoryType: any;
    public formMark: any;
    public mark: any;

    constructor(
        private adminService: AdminService,
        private store: Store<any>,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private dataAplicationService: DataAplicationService
    ) {
        this.getStore();
    }

    ngOnInit() {
        this.initializeData();
        this.detectedChangeRoute();
        this.createForm();
    }

    initializeData() {
        this.categoryType = this.route.snapshot.paramMap.get('type');
        console.log('aaaaa');
        if (this.categoryType) {
            this.getCategoriesMovie(this.categoryType);
        } else {
            this.getAllMovies();
        }
    }

    detectedChangeRoute(): void {
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.initializeData();
            }
        });
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

    getCategoriesMovie(type) {
        this.adminService.getMovieForType('category_movie', type)
            .pipe(
                map(data => data['movies'])
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

    takeInformation(movie) {
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


    onSubmit(form) {
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
        document.getElementById('modal-marks').click();
        this.initializeData();
    }

}
