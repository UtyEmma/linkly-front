import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { ToastService } from 'src/app/providers/services/alert/toast.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(
	private _router: Router, 
	private _auth: AuthService,
	private _toast: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
			catchError((error: HttpErrorResponse) => {
						let data = error.error
						switch (error.status) {
							case 0:
								this._toast.error("Error: Internet Connection Could not be established")
								return throwError(() => new Error("Error: Internet Connection Could not be established"));
							case 500:
								this._toast.error("Error 500: Internal Server Error")
								return throwError(() => new Error('Something bad happened; please try again later.'));
								case 401:
									this._auth.logout()
									this._router.navigateByUrl('/login')
									return throwError(() => new Error('Error 401: You are not authorized to make this request.'));
							default:
								this._toast.error("Unknown Error: Please try again or contact Support.")
							return throwError(() => error);
						}
					}
			)
		);
  }
}
