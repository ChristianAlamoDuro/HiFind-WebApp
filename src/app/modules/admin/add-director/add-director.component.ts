import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AdminService } from '@services/admin/admin.service';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';

@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.component.html',
  styleUrls: ['./add-director.component.sass']
})
export class AddDirectorComponent implements OnInit {

  public title: string;
  public userId: string;
  public formGroup: FormGroup;

  constructor(
      private store: Store<any>,
      private formBuilder: FormBuilder,
      private adminService: AdminService,
      private dataService: DataAplicationService
  ) {
      this.title = 'Add director';
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
          directorName: [
              '',
              Validators.compose([
                  Validators.required,
                  Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')
              ])
          ],
          directorSurname: [
              '',
              Validators.compose([
                  Validators.required,
                  Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')
              ])
          ],
          directorBirthday: [
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

  onSubmit(formDirector) {

      const data = {
          name: formDirector.value.directorName,
          surname: formDirector.value.directorSurname,
          birthday: formDirector.value.directorBirthday,
          biography: formDirector.value.biography,
          image: formDirector.value.image,
      };
      console.log(data);
      this.adminService.addDirector(data).
          subscribe(response => {
              console.log(response);

              this.dataService.createModal('success', 'Successfull', 'Director have been saved');
              this.formGroup.reset();
          });
  }

}
