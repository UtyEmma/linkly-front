import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any = null

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    this._userService.current.subscribe(user => this.user = user)
  }

}
