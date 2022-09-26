import { Injectable } from '@angular/core';
import {Notify} from 'notiflix';
import { BehaviorSubject } from 'rxjs';

type ToastStatus = 'warning' | 'error' | 'success' | null

export interface IToast {
  message: string,
  show: boolean,
  status: ToastStatus
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() {
    Notify.init({
      width: 'auto',
      position: 'center-bottom',
      closeButton: false,
      useIcon: true,
    }); 
  }
   
  
  success(message: string, options: any = {}){
    Notify.merge(options)
    Notify.success(message)
  }

  error(message: string, options: any = {}){
    Notify.failure(message)
  }
}
