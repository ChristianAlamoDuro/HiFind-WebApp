import { Component, OnInit } from '@angular/core';
import { DataAplicationService } from '@services/data-aplication/data-aplication.service';
import { Store } from '@ngrx/store';
import { map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-web-map',
  templateUrl: './web-map.component.html',
  styleUrls: ['./web-map.component.sass']
})
export class WebMapComponent implements OnInit {
  public dataAplication;
  constructor(
    public dataService: DataAplicationService,
    private store: Store<any>,
    public userId: string) {

  }

  ngOnInit() {
    this.getStore();
    this.dataService.getData().subscribe(
      result => {
        this.dataAplication = result;

        console.log(this.dataAplication);
      }
    );
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
}
