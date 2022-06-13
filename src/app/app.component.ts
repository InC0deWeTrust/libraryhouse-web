import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'libraryhouse-web';
  showLoader$ = this._spinner.loadingAction$

  constructor(
    private _spinner: SpinnerService) {}
}
