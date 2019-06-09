import { Component, OnInit } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-actor',
    templateUrl: './add-actor.component.html',
    styleUrls: ['./add-actor.component.sass']
})
export class AddActorComponent implements OnInit {

    public title: string;
    public userId: string;
    public formGroup: FormGroup;
    public actorId: string;
    public name: string;
    public surname: string;
    public birthday: string;
    public biography: string;
    public image: any;

    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private dataService: DataAplicationService,
        private route: ActivatedRoute
    ) {
        this.title = 'Add actor';
    }

    ngOnInit() {
        this.takeParamsUrl();
    }

    takeParamsUrl() {
        this.actorId = this.route.snapshot.paramMap.get('id');

        if (this.actorId) {
            this.adminService.getGame(this.actorId)
                .pipe(
                    map(response => response['actors']),
                    finalize(() => this.createForm())
                )
                .subscribe(response => {
                    // FILM DATA
                });
        } else {
            this.createForm();
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

    createForm() {
        this.formGroup = this.formBuilder.group({
            actorName: [
                this.name,
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')
                ])
            ],
            actorSurname: [
                this.surname,
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')
                ])
            ],
            actorBirthday: [
                this.birthday,
                Validators.compose([Validators.required, Validators.pattern('^[0-3]{1}[0-9]{1}/[0-1]{1}[0-9]{1}/[12]{1}[0-9]{3}$')])
            ],
            biography: [
                this.biography,
                Validators.compose([Validators.required])
            ],
            image: [
                this.image
            ]
        });
    }

    onSubmit(formActor) {

        const data = {
            name: formActor.value.actorName,
            surname: formActor.value.actorSurname,
            birthday: formActor.value.actorBirthday,
            biography: formActor.value.biography,
            image: formActor.value.image,
        };
        console.log(data);
        this.adminService.addActor(data).
            subscribe(response => {
                console.log(response);

                this.dataService.createModal('success', 'Successfull', 'Actor have been saved');
                this.formGroup.reset();
            });
    }

}
