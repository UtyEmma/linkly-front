import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/providers/services/app/app.service';
import { UserService } from 'src/app/providers/services/user/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any = null
  title = "Dashboard - Home"

  constructor(
    private _userService: UserService,
    private _app: AppService,
    private _title: Title
    ) { }

  ngOnInit(): void {

    this._userService.current.subscribe(user => {
      this.user = user
      if(user){
        this._title.setTitle(`${user?.name} - Dashboard`)
      }
    })
  }

}
