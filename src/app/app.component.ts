import { Component } from '@angular/core';
import { HelperService } from '@services/helper/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HiFind';

  constructor(
    private helperService: HelperService
  ) {
    this.helperService.initialInformation();
  }

}
