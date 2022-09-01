import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Cookies from 'universal-cookie';
import _cookies from '../../providers/cookies.provider';
import CookieProvider from '../../providers/cookies.provider';
import { AppService } from '../app/app.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  key = 'LINKLYUSR'
  cookie

  constructor(private _user: UserService) { 
    this.cookie = new Cookies()
  }

  login(token: string, user: any){
    this._user.set(user)
    return _cookies.set(this.key, token)
  }

  status(){
    return !!this.token()
  }

  token(){
    return _cookies.get(this.key)
  }

  async refresh(){
    await this._user.refresh()
  }

  async user(){
    this._user.get()
  }

  logout(){
    return _cookies.remove(this.key)
  }

}
