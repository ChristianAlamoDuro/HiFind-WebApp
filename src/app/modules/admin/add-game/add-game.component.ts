import { Component, OnInit, } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@core/services/admin/admin.service';
import { map, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-add-game',
    templateUrl: './add-game.component.html',
    styleUrls: ['./add-game.component.sass']
})
export class AddGameComponent implements OnInit {

    public formGame: any;
    public dataAplication: any;
    public title: string;
    public categoriesSelected: any[];
    public gameCategories: any;
    public gameId: string;
    public gameNameValue: string;
    public gameDuration: string;
    public gamePublicDirected: number;
    public gameOutDate: string;
    public categories: any[];
    public gameSinopsis: string;
    public gameImage: File;
    public userId: string;
    public load: boolean;

    constructor(
        private dataService: DataAplicationService,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private route: ActivatedRoute,
        private store: Store<any>
    ) {
        this.getCategoryType();
        this.getDataAplication();
        this.title = 'Add new video-game';
        this.categoriesSelected = [];
        this.gameCategories = [];
        this.getStore();
        this.load = false;
    }

    ngOnInit() {
    }

    takeParamsUrl() {
        this.gameId = this.route.snapshot.paramMap.get('id');

        if (this.gameId) {
            this.title = 'Modify game';
            this.adminService.getGame(this.gameId)
                .pipe(
                    map(response => response['games']),
                    finalize(() => {
                        this.generateCategoryId();
                        this.createForm();
                        this.load = true;
                    })
                )
                .subscribe(response => {
                    this.categoriesSelected = response[0].categories;
                    this.gameNameValue = response[0].name;
                    this.gameDuration = response[0].duration;
                    this.gamePublicDirected = response[0].public_directed;
                    this.gameOutDate = response[0].out_date;
                    this.gameSinopsis = response[0].sinopsis;
                });
        } else {
            this.createForm();
            this.load = true;
        }
    }

    checkCheckbox() {
        if (this.gameCategories.length >= 1) {
            const categories = this.gameCategories.split(',');
            for (const category of categories) {
                document.getElementById(category)['checked'] = true;
            }
        }
    }

    getDataAplication() {
        const self = this;

        self.dataService.getData()
            .subscribe(response => {
                self.dataAplication = response;
            });
    }

    createForm() {
        this.formGame = this.formBuilder.group({
            name: [
                this.gameNameValue,
                Validators.required
            ],
            duration: [
                this.gameDuration,
                Validators.compose([Validators.required, Validators.pattern('^[0-9]{2}:[0-9]{2}$')])
            ],
            publicDirected: [
                this.gamePublicDirected,
                Validators.compose([Validators.required, Validators.min(3), Validators.max(21)])
            ],
            sinopsis: [
                this.gameSinopsis,
                Validators.compose([Validators.required])
            ],
            outDate: [
                this.gameOutDate,
                Validators.compose([Validators.required, Validators.pattern('^[0-3]{1}[0-9]{1}/[0-1]{1}[0-2]{1}/[12]{1}[0-9]{3}$')])
            ],
            image: [
                this.gameImage, Validators.required
            ]
        });
    }

    getCategoryType() {
        this.categories = [];
        this.adminService.getCategory('is_game')
            .pipe(
                map(data => data['category']),
                finalize(() => this.getCategorySpecial())
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

    getCategorySpecial() {
        this.adminService.getCategory('is_special_game')
        .pipe(
            map(data => data['category']),
            finalize(() => this.takeParamsUrl())
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

    constructCategory(categoryId) {
        categoryId = parseInt(categoryId.target.value);

        if (this.categoriesSelected.find(item => item === categoryId)) {
            this.categoriesSelected.splice(this.categoriesSelected.indexOf(categoryId), 1);
        } else {
            this.categoriesSelected.push(categoryId);
        }

        this.generateCategoryOnForm();
    }

    generateCategoryId() {
        let idCategorie = [];
        for (const categories of this.categoriesSelected) {
            let aux = [];
            aux.push(this.categories.find(item => item.name ===  categories));
            idCategorie.push(aux[0].id);
        }

        this.categoriesSelected = idCategorie;
        this.generateCategoryOnForm();
    }

    generateCategoryOnForm(): void {
        let nameCategory = [];
        for (const categories of this.categoriesSelected) {
            const aux = [];
            aux.push(this.categories.find(item => item.id === +categories));
            nameCategory.push(aux[0].name);
        }
        console.log('fin');
        this.gameCategories = nameCategory.join(',');
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

    takeImage(image) {
        this.gameImage = image;
    }

    onSubmit(formGame) {
        if (this.formGame.valid && this.categoriesSelected.length >= 1) {
            let data: any;
            data = {
                name: formGame.value.name,
                sinopsis: formGame.value.sinopsis,
                duration: formGame.value.duration,
                public_directed: formGame.value.publicDirected,
                out_date: formGame.value.outDate,
                categories: this.categoriesSelected,
                user_id: this.userId
            };

            if (this.gameId) {
                data = {
                    ...data,
                    id: this.gameId
                };
            }

            this.adminService.addGame(data, this.gameImage[0]).
                subscribe(response => {
                    if (response['status'] !== 'error') {
                        this.dataService.createModal('success', 'Successfull', 'Game have been saved');
                        this.formGame.reset();
                    } else {
                        this.dataService.createModal('error', 'Sorry', 'The formulary is incorrent, please try again');
                    }
                });
        } else {
            this.dataService.createModal('error', 'Sorry', 'The formulary is incorrent, please try again');
        }

    }

}
