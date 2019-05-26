import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@core/services/admin/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public dataAplication: any;
  public formGroup: FormGroup;
  public categoryName: string;

  constructor(
    private dataService: DataAplicationService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    this.getDataAplication();
  }

  ngOnInit() {
    this.createForm();
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
      categoryName: [null, Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')])]
    });
  }

  onSubmit(formGroup) {
    const data = {
      name: formGroup.value.categoryName
    };
    this.adminService.addCategory(data).subscribe(
      response => {
        console.log(response);
      }
    );
  }

}
