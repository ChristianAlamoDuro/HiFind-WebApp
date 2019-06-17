import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@core/services/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { map, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.sass']
})
export class AddCategoryComponent implements OnInit {

    public dataAplication: any;
    public formGroup: FormGroup;
    public categoryName: string;
    public title: string;
    public categoryId: string;
    public selectedValue: string;
    public categoryNameValue = '';
    public userId: string;

    constructor(
        private dataService: DataAplicationService,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private route: ActivatedRoute,
        private store: Store<any>
    ) {
        this.getDataAplication();
        this.title = 'Add category';
        this.getStore();
    }

    ngOnInit() {
        this.takeParamsUrl();
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

    takeParamsUrl() {
        this.categoryId = this.route.snapshot.paramMap.get('id');

        if (this.categoryId) {
            this.adminService.getCategory(this.categoryId)
                .pipe(
                    map(response => response['category']),
                    finalize(() => this.createForm())
                )
                .subscribe(response => {
                    this.categoryNameValue = response[0].name;
                    this.selectedValue = response[0].special_category;
                });
        } else {
            this.selectedValue = 'is_special_game';
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
        this.formGroup = this.formBuilder.group({
            categoryName: [
                this.categoryNameValue,
                Validators.compose([
                    Validators.required
                ])
            ],
            categoryType: [
                this.selectedValue,
                Validators.required
            ]
        });
    }

    onSubmit(formGroup) {
        let data;
        if (this.categoryId) {
            data = {
                name: formGroup.value.categoryName,
                special_category: formGroup.value.categoryType,
                id: this.categoryId,
                user_id: this.userId
            };
        } else {
            data = {
                name: formGroup.value.categoryName,
                special_category: formGroup.value.categoryType,
                user_id: this.userId
            };
        }
        console.log(data);

        this.adminService.addCategory(data).subscribe(
            response => {
                console.log(response);
            }
        );

    }

}
