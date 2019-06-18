import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from '@services/admin/admin.service';
import { Store } from '@ngrx/store';
import { map, finalize } from 'rxjs/operators';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    public directorsSelected: any[];
    public actorsSelected: any[];
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
    public load = false;
    public actors: any;
    public directors: any;

    constructor(
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private store: Store<any>,
        private dataService: DataAplicationService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.getStore();
        this.categoriesSelected = [];
        this.directorsSelected = [];
        this.actorsSelected = [];
        this.takeParamsUrl();
    }

    ngOnInit() {
    }

    takeParamsUrl() {
        this.movieId = this.route.snapshot.paramMap.get('id');

        if (this.movieId) {
            this.title = 'Modify Movie';
            this.adminService.getMovie(this.movieId)
                .pipe(
                    map(response => response['movies'])
                )
                .subscribe(response => {
                    console.log(response);
                    this.movieNameValue = response[0].title;
                    this.movieFillProducer = response[0].film_producer;
                    this.movieDuration = response[0].duration;
                    this.moviePublicDirected = response[0].public_directed;
                    this.movieOutDate = response[0].out_date;
                    this.movieSinopsis = response[0].sinopsis;
                    this.categoriesSelected = response[0].categories;
                    this.actorsSelected = response[0].actors;
                    this.directorsSelected = response[0].directors;
                    this.modifyMovie();
                });
        } else {
            this.getCategoryType();
            this.getActors();
            this.getDirectors();
            this.createForm();
            this.load = true;
        }
    }

    modifyMovie() {
        this.getCategoryType();
    }

    generateCategoryId() {
        let idCategorie = [];
        console.log(this.categoriesSelected);
        for (const categories of this.categoriesSelected) {
            let aux = [];
            console.log(this.categories);
            aux.push(this.categories.find(item => item.name === categories));
            idCategorie.push(aux[0].id);
        }

        this.categoriesSelected = idCategorie;
        this.generateCategoryOnForm();

        // actors
        let idActor = [];
        for (const categories of this.actorsSelected) {
            let aux = [];
            aux.push(this.actors.find(item => item.name === categories));
            idActor.push(aux[0].id);
        }

        this.actorsSelected = idActor;
        this.generateActorOnForm();

        // directors
        let idDirector = [];
        for (const categories of this.directorsSelected) {
            let aux = [];
            aux.push(this.directors.find(item => item.name === categories));
            idDirector.push(aux[0].id);
        }

        this.directorsSelected = idDirector;
        this.generateDirectorOnForm();
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
                Validators.compose([Validators.required, Validators.maxLength(255)])
            ],
            outDate: [
                this.movieOutDate,
                Validators.pattern('^[0-3]{1}[0-9]{1}/[0-1]{1}[0-9]{1}/[12]{1}[0-9]{3}$')
            ],
            image: [
                this.movieImage, Validators.required
            ]
        });
        this.load = true;
    }

    checkCheckbox() {
        for (const id of this.actorsSelected) {
            const idData = 'A-' + id;
            document.getElementById(idData)['checked'] = true;
        }

        for (const id of this.directorsSelected) {
            const idData = 'D-' + id;
            document.getElementById(idData)['checked'] = true;
        }

        for (const id of this.categoriesSelected) {
            const idData = 'C-' + id;
            document.getElementById(idData)['checked'] = true;
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
                map(data => data['category']),
                finalize(() => {
                    if (this.movieId) {
                        this.getActors();
                    }
                })
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
                map(data => data['actors']),
                finalize(() => {
                    if (this.movieId) {
                        this.getDirectors();
                    }
                })
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
                map(data => data['directors']),
                finalize(() => {
                    if (this.movieId) {
                        this.generateCategoryId();
                        this.createForm();
                        console.log('fin');
                    }
                })
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
        categoryId = parseInt(categoryId.target.value);

        if (this.categoriesSelected.find(item => item === categoryId)) {
            this.categoriesSelected.splice(this.categoriesSelected.indexOf(categoryId), 1);
        } else {
            this.categoriesSelected.push(categoryId);
        }
        this.generateCategoryOnForm();
    }

    constructDirector(directorId) {
        directorId = parseInt(directorId.target.value);

        if (this.directorsSelected.find(item => item === directorId)) {
            this.directorsSelected.splice(this.directorsSelected.indexOf(directorId), 1);
        } else {
            this.directorsSelected.push(directorId);
        }

        this.generateDirectorOnForm();
    }

    constructActor(actorId) {
        actorId = parseInt(actorId.target.value);

        if (this.actorsSelected.find(item => item === actorId)) {
            this.actorsSelected.splice(this.actorsSelected.indexOf(actorId), 1);
        } else {
            this.actorsSelected.push(actorId);
        }

        this.generateActorOnForm();
    }

    generateCategoryOnForm(): void {
        let namecategorie = [];
        for (const categories of this.categoriesSelected) {
            let aux = [];
            aux.push(this.categories.find(item => item.id === +categories));
            namecategorie.push(aux[0].name);
        }
        this.movieCategories = namecategorie.join(',');
    }

    generateActorOnForm(): void {
        console.log('llamada');
        let nameActor = [];
        for (const categories of this.actorsSelected) {
            let aux = [];
            aux.push(this.actors.find(item => item.id === +categories));
            nameActor.push(aux[0].name);
        }
        this.movieActors = nameActor.join(',');

    }

    generateDirectorOnForm(): void {
        let nameDirector = [];
        for (const categories of this.directorsSelected) {
            let aux = [];
            aux.push(this.directors.find(item => item.id === +categories));
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
            console.log(data);
            
            this.adminService.addMovie(data, this.movieImage[0])
                .subscribe(response => {
                    console.log(response);
                });
            this.dataService.createModal('success', 'Successfull', 'Movie have been saved');
            this.router.navigate(['/adminShow/movies']);
        } else {
            this.dataService.createModal('error', 'Sorry', 'The formulary is incorrent, please try again');
        }
    }

}
