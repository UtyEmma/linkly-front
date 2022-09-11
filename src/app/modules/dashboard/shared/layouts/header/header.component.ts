import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;

  constructor(
    private _user: UserService
  ) { }

  ngOnInit(): void {
    this._user.current.subscribe(user => this.user = user)
  }

}
