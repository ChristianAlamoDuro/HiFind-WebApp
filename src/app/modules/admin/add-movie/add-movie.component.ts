import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '@services/admin/admin.service';
import { Store } from '@ngrx/store';
import { map, finalize } from 'rxjs/operators';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-movie',
    templateUrl: './add-movie.component.html',
    styleUrls: ['./add-movie.component.sass']
})
export class AddMovieComponent implements OnInit {

    public formMovie: any;
    public dataAplication: any;
    public title = 'Add Movie';
    public categoriesSelected: any[];
    public directorsSelected: any [];
    public actorsSelected: any [];
    public movieCategories: any;
    public movieActors: any;
    public movieDirectors: any;
    public movieId: string;
    public movieNameValue: string;
    public movieDuration: string;
    public moviePublicDirected: number;
    public movieOutDate: string;
    public movieFillProducer: string;
    public movieImage: File;
    public movieSinopsis: string;
    public categories: any[];
    public userId: string;
    public load = true;
    public actors: any;
    public directors: any;

    constructor(
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private store: Store<any>,
        private dataService: DataAplicationService,
        private route: ActivatedRoute,
    ) {
        this.takeParamsUrl();
        this.getStore();
        this.getCategoryType();
        this.getActors();
        this.getDirectors();
        this.categoriesSelected = [];
        this.directorsSelected = [];
        this.actorsSelected = [];
    }

    ngOnInit() {
        this.createForm();
    }

    takeParamsUrl() {
        this.movieId = this.route.snapshot.paramMap.get('id');

        if (this.movieId) {
            this.adminService.getMovie(this.movieId)
                .pipe(
                    map(response => response['movies']),
                    finalize(() => {
                        this.createForm();
                        this.load = true;
                    })
                )
                .subscribe(response => {
                    this.movieNameValue = response[0].title;
                    this.movieFillProducer = response[0].fill_producer;
                    this.movieDuration = response[0].duration;
                    this.moviePublicDirected = response[0].public_directed;
                    this.movieOutDate = response[0].out_date;
                    this.movieSinopsis = response[0].sinopsis;
                    this.categoriesSelected = response[0].categories;
                    // this.generateCategoryId();
                    // this.generateCategoryOnForm();
                });
        } else {
            this.createForm();
            this.load = true;
        }
    }

    takeImage(image) {
        this.movieImage = image;
    }

    createForm() {
        this.formMovie = this.formBuilder.group({
            name: [
                this.movieNameValue,
                Validators.compose([Validators.required])
            ],
            filmProducer: [
                this.movieFillProducer,
                Validators.compose([Validators.required])
            ],
            duration: [
                this.movieDuration,
                Validators.compose([Validators.required, Validators.pattern('^[0-9]{2}:[0-9]{2}$')])
            ],
            publicDirected: [
                this.moviePublicDirected,
                Validators.compose([Validators.required, Validators.min(3), Validators.max(21)])
            ],
            sinopsis: [
                this.movieSinopsis,
                Validators.compose([Validators.required])
            ],
            outDate: [
                this.movieOutDate,
                Validators.compose([Validators.required, Validators.pattern('^[0-3]{1}[0-9]{1}/[0-1]{1}[0-9]{1}/[12]{1}[0-9]{3}$')])
            ],
            image: [
                this.movieImage, Validators.required
            ]
        });
    }

    checkCheckbox(type) {
        let check;
        switch (type) {
            case 'category':
                check = this.movieCategories;
                break;
            case 'actor':
                check = this.movieActors;
                break;
            case 'director':
                check = this.movieDirectors;
                break;                
        }
        console.log(check);

        const categories = this.movieCategories.split(',');
        for (const category of categories) {
            document.getElementById(category)['checked'] = true;
        }
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

    getCategoryType() {
        this.categories = [];
        this.adminService.getCategory('is_movie')
            .pipe(
                map(data => data['category'])
            )
            .subscribe(response => {
                if (response) {
                    for (const category of response) {
                        const data = {
                            ...category,
                        };

                        this.categories.push(data);
                    }
                }
            });

        this.adminService.getCategory('is_special_movie')
            .pipe(
                map(data => data['category'])
            )
            .subscribe(response => {
                if (response) {
                    for (const category of response) {
                        const data = {
                            ...category,
                        };

                        this.categories.push(data);
                    }
                }
            });
    }

    getActors() {
        this.actors = [];
        this.adminService.getAllActors()
            .pipe(
                map(data => data['actors'])
            )
            .subscribe(response => {
                if (response) {
                    for (const category of response) {
                        const data = {
                            id: category.id,
                            name: category.name,
                            surname: category.surname,
                            birthday: category.birthday
                        };

                        this.actors.push(data);
                    }
                }
            });
    }

    getDirectors() {
        this.directors = [];
        this.adminService.getAllDirectors()
            .pipe(
                map(data => data['directors'])
            )
            .subscribe(response => {
                if (response) {
                    for (const category of response) {
                        const data = {
                            id: category.id,
                            name: category.name,
                            surname: category.surname,
                            birthday: category.birthday
                        };

                        this.directors.push(data);
                    }
                }
            });
    }

    constructCategory(categoryId) {
        if (this.categoriesSelected.includes(categoryId.target.value)) {
            this.categoriesSelected.splice(this.categoriesSelected.indexOf(categoryId.target.value), 1);
        } else {
            this.categoriesSelected.push(categoryId.target.value);
        }
        this.generateCategoryOnForm();
    }

    constructDirector(directorId) {
        if (this.directorsSelected.includes(directorId.target.value)) {
            this.directorsSelected.splice(this.directorsSelected.indexOf(directorId.target.value), 1);
        } else {
            this.directorsSelected.push(directorId.target.value);
        }
        this.generateDirectorOnForm();
    }

    constructActor(directorId) {
        if (this.actorsSelected.includes(directorId.target.value)) {
            this.actorsSelected.splice(this.actorsSelected.indexOf(directorId.target.value), 1);
        } else {
            this.actorsSelected.push(directorId.target.value);
        }
        this.generateActorOnForm();
    }

    generateCategoryOnForm(): void {
        let namecategorie = [];
        for (const categories of this.categoriesSelected) {
            let aux = [];
            aux.push(this.categories.find(item => item.id ===  +categories));
            namecategorie.push(aux[0].name);
        }
        this.movieCategories = namecategorie.join(',');
    }

    generateActorOnForm(): void {
        let nameActor = [];
        for (const categories of this.actorsSelected) {
            let aux = [];
            aux.push(this.actors.find(item => item.id ===  +categories));
            nameActor.push(aux[0].name);
        }
        this.movieActors = nameActor.join(',');
    }

    generateDirectorOnForm(): void {
        let nameDirector = [];
        for (const categories of this.directorsSelected) {
            let aux = [];
            aux.push(this.directors.find(item => item.id ===  +categories));
            nameDirector.push(aux[0].name);
        }
        this.movieDirectors = nameDirector.join(',');
    }

    onSubmit(form) {
        if (this.formMovie.valid &&
            this.categoriesSelected.length >= 1 && 
            this.directorsSelected.length >= 1 && this.actorsSelected.length >= 1
        ) {
            let data: any;
            data = {
                title: form.value.name,
                sinopsis: form.value.sinopsis,
                duration: form.value.duration,
                public_directed: form.value.publicDirected,
                out_date: form.value.outDate,
                film_producer: form.value.filmProducer,
                categories: this.categoriesSelected,
                directors: this.directorsSelected,
                actors: this.actorsSelected,
                user_id: this.userId
            };

            if (this.movieId) {
                data = {
                    ...data,
                    id: this.movieId
                };
            }

            this.adminService.addMovie(data, this.movieImage[0])
                .subscribe(response => {
                    console.log(response);
                });
            this.dataService.createModal('success', 'Successfull', 'Movie have been saved');
        } else {
            this.dataService.createModal('error', 'Sorry', 'The formulary is incorrent, please try again');
        }
    }

}
