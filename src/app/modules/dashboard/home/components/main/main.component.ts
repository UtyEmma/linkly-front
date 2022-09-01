import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/services/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: any = null
  constructor(private _user: UserService) { }

  ngOnInit(): void {
    this._user.current.subscribe(user => this.user = user)
  }

}
