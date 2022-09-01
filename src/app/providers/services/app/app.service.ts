import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor() { }

  private readonly _appSource = new BehaviorSubject<any>({
    user: null
  })

  readonly app = this._appSource.asObservable()

  get(){
    return this._appSource.getValue()
  }

  set(state: any){
    this._appSource.next(state)
  }

  user(){
    return this.get().user
  }

}


