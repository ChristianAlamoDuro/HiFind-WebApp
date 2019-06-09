import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';

@Component({
    selector: 'app-add-actor',
    templateUrl: './add-actor.component.html',
    styleUrls: ['./add-actor.component.sass']
})
export class AddActorComponent implements OnInit {

    public title: string;
    public userId: string;
    public formGroup: FormGroup;

    constructor(
        private store: Store<any>,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private dataService: DataAplicationService
    ) {
        this.title = 'Add actor';
    }

    ngOnInit() {
        this.createForm();
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
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')
                ])
            ],
            actorSurname: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')
                ])
            ],
            actorBirthday: [
                '',
                Validators.compose([Validators.required, Validators.pattern('^[0-3]{1}[0-9]{1}/[0-1]{1}[0-9]{1}/[12]{1}[0-9]{3}$')])
            ],
            biography: [
                '',
                Validators.compose([Validators.required])
            ],
            image: [
                null
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
