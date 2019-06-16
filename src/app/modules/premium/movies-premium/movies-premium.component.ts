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
    public title: string;
    public categories: string[];
    public actors: string[];
    public directors: string[];
    public outDate: string;
    public publicDirected: string;
    public duration: string;
    public sinopsis: string;
    public image: string;
    public marks: string [];
    public movieId: string;
    public filmProducer: string;

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

    takeInformation(movie) {
        this.title = movie.title;
        this.categories = movie.categories.join(',');
        this.actors = movie.actors.join(',');
        this.directors = movie.directors.join(',');
        this.outDate = movie.out_date;
        this.publicDirected = movie.public_directed;
        this.duration = movie.duration;
        this.sinopsis = movie.sinopsis;
        this.image = movie.image;
        this.marks = movie.marks;
        this.movieId = movie.id;
        this.filmProducer = movie.film_producer;
    }

}
