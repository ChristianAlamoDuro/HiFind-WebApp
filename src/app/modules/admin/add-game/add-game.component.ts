import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '@core/services/admin/admin.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {

  public formGame: any;
  public dataAplication: any;

  constructor(
    private dataService: DataAplicationService,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    this.getDataAplication();
    this.createForm();
  }

  ngOnInit() {
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
      name: [null, Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')])],
      sinopsis: [null, Validators.compose([Validators.required,  Validators.pattern('^[a-zA-Z]{1}[a-zA-Z ]*[a-zA-Z]$')])],
      duration: [null, Validators.compose([Validators.required,  Validators.pattern('^[0-9]{2}:[0-9]{2}$')])],
      publicDirected: [null, Validators.compose([Validators.required,  Validators.min(3), Validators.max(21)])],
      image: null
    });
  }

  onSubmit(formGame) {
    const data = {
      name: formGame.value.name,
      sinopsis: formGame.value.sinopsis,
      duration: formGame.value.duration,
      publicDirected: formGame.value.publicDirected,
      image: formGame.value.image
    };

    console.log(data);

    this.adminService.addGame(data).
      subscribe(response => {
        console.log(response);
      });
  }

}
