import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/providers/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _title: Title,
    private _user: UserService
  ){

  }

  ngOnInit(): void {
    this._user.current.subscribe(user => {
      this._title.setTitle(`Profile - ${user.name}`)
    })
  }

}
