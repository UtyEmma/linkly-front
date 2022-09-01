import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Cookies from 'universal-cookie';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  cookie

  constructor(private _http: HttpClient) { 
    this.cookie = new Cookies()
  }

  private readonly _userState = new BehaviorSubject<any>(null)

  readonly current = this._userState.asObservable()

  get(){
    return this._userState.getValue()
  }

  set(state: any){
    this._userState.next(state)
  }

  async refresh(){    
    return this._http.get('user').subscribe((res: any) => {
      this.set(res.data.user)
    })
  }

}
