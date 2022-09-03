import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private readonly _pageSource = new BehaviorSubject<any>(null)

  readonly current = this._pageSource.asObservable()

  constructor() { }

  set(state: any){
    return this._pageSource.next(state)
  }

  get(){
    return this._pageSource.getValue()
  }

}
