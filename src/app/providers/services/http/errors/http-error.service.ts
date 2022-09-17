import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs'
import { HttpErrors } from 'src/library/http';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  errors: Record<string, any> = {}
  message: string = ""

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  onError(err: HttpErrorResponse, callback?: (errors: Record<string, any>, message: string) => any){
    if (err instanceof HttpErrorResponse) {
      if(err.status === 422) {
        this.errors = HttpErrors.map(err.error)
      }
    }
    this.message = err.error?.message
    return callback && callback(this.errors, this.message)
	  // return throwError(() => new Error(err.message))
  }
}
