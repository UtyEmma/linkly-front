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

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private _auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
			catchError((error: HttpErrorResponse) => {
						let data = error.error
						switch (error.status) {
							case 0:
								console.log(error.error)
								return throwError(() => new Error('Something bad happened; please try again later.'));
							case 500:
								// this._toasterService.error(data.message, "", {closeButton: true})
								return throwError(() => new Error('Something bad happened; please try again later.'));
							case 401:
								this._auth.logout()
								this._router.navigateByUrl('/login')
								return throwError(() => new Error('Something bad happened; please try again later.'));
						default:
							// this._toasterService.error("Something unexpected happened", "Unknown Error");
							return throwError(() => error);
						}
					}
			)
		);
  }
}
