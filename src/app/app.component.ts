import { Component, OnInit } from '@angular/core';
import { AppService } from './providers/services/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Dashboard';

  constructor(
    private _app: AppService
  ){}

  ngOnInit(){
    const app = this._app.get()
    this.title = app.page
  }

}
