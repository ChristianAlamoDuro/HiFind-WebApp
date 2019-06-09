import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
    public gameId: string;
    public gameNameValue: string;
    public gameDuration: string;
    public gamePublicDirected: number;
    public gameOutDate: string;
    public categories: any[];
    public gameSinopsis: string;
    public gameImage: any;
    public userId: string;

    constructor(
        private dataService: DataAplicationService,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private route: ActivatedRoute,
        private store: Store<any>
    ) {
        this.getDataAplication();
        this.createForm();
        this.title = 'Add new video-game';
        this.categoriesSelected = [];
        this.getStore();
    }

    ngOnInit() {
        this.takeParamsUrl();
        this.getCategoryType();
    }

    takeParamsUrl() {
        this.gameId = this.route.snapshot.paramMap.get('id');

        if (this.gameId) {
            this.adminService.getGame(this.gameId)
                .pipe(
                    map(response => response['games']),
                    finalize(() => this.createForm())
                )
                .subscribe(response => {
                    this.gameNameValue = response[0].name;
                });
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
                Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')])
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
                Validators.compose([Validators.required, Validators.pattern('^[0-3]{1}[0-9]{1}/[0-1]{1}[0-9]{1}/[12]{1}[0-9]{3}$')])
            ],
            image: [
                this.gameImage
            ]
        });
    }

    getCategoryType() {
        this.categories = [];
        this.adminService.getCategory('is_game')
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

        this.adminService.getCategory('is_special_game')
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

    constructCategory(categoryId) {
        if (this.categoriesSelected.includes(categoryId.target.value)) {
            this.categoriesSelected.splice(this.categoriesSelected.indexOf(categoryId.target.value), 1);
        } else {
            this.categoriesSelected.push(categoryId.target.value);
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

    onSubmit(formGame) {
        if (this.validateSubmit()) {
            const data = {
                name: formGame.value.name,
                sinopsis: formGame.value.sinopsis,
                duration: formGame.value.duration,
                public_directed: formGame.value.publicDirected,
                out_date: formGame.value.outDate,
                image: formGame.value.image,
                categories: this.categoriesSelected,
                user_id: this.userId
            };
            console.log(data);
            this.adminService.addGame(data).
                subscribe(response => {
                    this.dataService.createModal('success', 'Successfull', 'Game have been saved');
                    this.formGame.reset();
                });
        } else {
            this.dataService.createModal('error', 'Sorry', 'The formulary is incorrent, please try again');
        }

    }
    validateSubmit() {
        let valid;

        if (this.formGame.valid && this.categoriesSelected.length >= 1) {
            valid = true;
        } else {
            valid = false;
        }

        return valid;
    }

}
