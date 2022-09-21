import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Cookies from 'universal-cookie';
import _cookies from '../../providers/cookies.provider';
import CookieProvider from '../../providers/cookies.provider';
import { AppService } from '../app/app.service';
import { UserService } from '../user/user.service';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  key = 'LINKLYUSR'
  rememberTokenKey = "remtok_id"
  cookie

  constructor(
    private _user: UserService,
    private _http: HttpClient,
    private _router: Router
    ) { 
    this.cookie = new Cookies()
  }

  login(token: string, user: any){
    this._user.set(user)
    return _cookies.set(this.key, token)
  }

  setRememberToken(token: string){
    const date = new Date()
    _cookies.set(this.rememberTokenKey, token, {
      expires: date,
      maxAge: 100
    })
  }

  getRememberToken(){
    return _cookies.get(this.rememberTokenKey)
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

  rememberUser(token = ""){
    return this._user.remember(token)
  }

  async user(){
    this._user.get()
  }

  logout(){
    this._http.get('/logout').subscribe((res) => {})
    _cookies.remove(this.key)
    return this._router.navigateByUrl('/login')
  }

}
