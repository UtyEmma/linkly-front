import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor() { }

  private readonly _appSource = new BehaviorSubject<any>({
    page: "Dashboard -"
  })

  readonly app = this._appSource.asObservable()
  readonly current = this._appSource.asObservable()

  get(){
    return this._appSource.getValue()
  }



  set(callback: (arg: any) => any){
    const current = this._appSource.getValue()
    const newState = callback(current)
    this._appSource.next(newState)
  }

  user(){
    return this.get().user
  }

}


