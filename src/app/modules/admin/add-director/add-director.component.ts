import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-director',
    templateUrl: './add-director.component.html',
    styleUrls: ['./add-director.component.sass']
})
export class AddDirectorComponent implements OnInit {

    public title: string;
    public userId: string;
    public directorId: string;
    public formGroup: FormGroup;
    public name: string;
    public surname: string;
    public birthday: string;
    public biography: string;
    public directorImage: any;
    public load = false;

    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private dataService: DataAplicationService,
        private route: ActivatedRoute
    ) {
        this.title = 'Add director';
    }

    ngOnInit() {
        this.takeParamsUrl();
        this.getStore();
    }

    takeParamsUrl() {
        this.directorId = this.route.snapshot.paramMap.get('id');

        if (this.directorId) {
            this.adminService.getDirector(this.directorId)
                .pipe(
                    finalize(() => this.createForm())
                )
                .subscribe(response => {
                    console.log(response);
                    this.name = response['name'];
                    this.surname = response['surname'];
                    this.biography = response['biography'];
                    this.birthday = response['birthday'];
                    this.load = true;
                });
        } else {
            this.createForm();
            this.load = true;
        }
    }

    takeImage(image) {
        this.directorImage = image;
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

    createForm() {
        this.formGroup = this.formBuilder.group({
            directorName: [
                this.name,
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-ZZÁÉÍÓÚ]+(([ ][a-zA-ZÁÉÍÓÚáéíúóÑñ ])?[a-zA-ZÁÉÍÓÚáéíúóÑñ]*)*$')
                ])
            ],
            directorSurname: [
                this.surname,
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-ZZÁÉÍÓÚ]+(([ ][a-zA-ZÁÉÍÓÚáéíúóÑñ ])?[a-zA-ZÁÉÍÓÚáéíúóÑñ]*)*$')
                ])
            ],
            directorBirthday: [
                this.birthday,
                Validators.compose([Validators.required, Validators.pattern('^[0-3]{1}[0-9]{1}/[0-1]{1}[0-2]{1}/[12]{1}[0-9]{3}$')])
            ],
            biography: [
                this.biography,
                Validators.compose([Validators.required])
            ],
            image: [
                this.directorImage,
                Validators.required
            ]
        });
    }

    onSubmit(formDirector) {

        let data: any;
        data = {
            name: formDirector.value.directorName,
            surname: formDirector.value.directorSurname,
            birthday: formDirector.value.directorBirthday,
            biography: formDirector.value.biography,
            image: formDirector.value.image,
            user_id: this.userId
        };

        if (this.directorId) {
            data = {
                ... data,
                id: this.directorId
            };
        }
        console.log(data);
        this.adminService.addDirector(data, this.directorImage[0]).
            subscribe(response => {
                this.dataService.createModal('success', 'Successfull', 'Director have been saved');
                this.formGroup.reset();
            });
    }

}
