import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth/auth.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private _auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
			tap(
				event => {},
				error => {
					if (error instanceof HttpErrorResponse) {
						let data = error.error
						switch (error.status) {
							case 422:
								// this._toasterService.error(data.message, "", {closeButton: true})
								break;
							case 500:
								// this._toasterService.error(data.message, "", {closeButton: true})
								break;
							case 401:
								this._auth.logout()
								this._router.navigateByUrl('/login')
								break;
						default:
							// this._toasterService.error("Something unexpected happened", "Unknown Error");
							break;
						}
					}
				}
			)
		);
  }
}
