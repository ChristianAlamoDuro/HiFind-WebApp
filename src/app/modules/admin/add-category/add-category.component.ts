import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@core/services/admin/admin.service';
import { ActivatedRoute } from '@angular/router';
import { map, finalize } from 'rxjs/operators';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    public dataAplication: any;
    public formGroup: FormGroup;
    public categoryName: string;
    public title: string;
    public categoryId: string;
    public selectedValue: string;
    public categoryNameValue = '';

    constructor(
        private dataService: DataAplicationService,
        private formBuilder: FormBuilder,
        private adminService: AdminService,
        private route: ActivatedRoute
    ) {
        this.getDataAplication();
        this.title = 'Add category';
    }

    ngOnInit() {
        this.takeParamsUrl();
        this.createForm();
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
                    this.categoryNameValue = response.name;
                    this.selectedValue = 'is_movie';
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
                    Validators.required,
                    Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')
                ])
            ],
            categoryType: [
                null,
                Validators.required
            ]
        });
    }

    onSubmit(formGroup) {
        const data = {
            name: formGroup.value.categoryName,
            special_category : formGroup.value.categoryType
        };
        this.adminService.addCategory(data).subscribe(
            response => {
                console.log(response);
            }
        );
    }

}