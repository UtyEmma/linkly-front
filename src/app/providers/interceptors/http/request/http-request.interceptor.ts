import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { ToastService } from 'src/app/providers/services/alert/toast.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private _auth: AuthService, 
    private _toast: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      // headers: this._auth.status() ? request.headers.set("Authorization", `Bearer ${this._auth.token()}`) : ''
			setHeaders: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json',
        "Authorization": `Bearer ${this._auth.token()}`
			},
			url: `${environment.apiBaseURL}/${request.url}`
		})



		return next.handle(newRequest);
  }
}
