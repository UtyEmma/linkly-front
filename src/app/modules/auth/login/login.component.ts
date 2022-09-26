import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observer, throwError } from 'rxjs';
import { ToastService } from 'src/app/providers/services/alert/toast.service';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  	loginForm!: FormGroup
  	loading: boolean = false
  	httpErrors: any = {}
	httpErrorMessage: string = ""
	appUrl = environment.appBaseURL

	constructor(
		private _fb: FormBuilder, 
		private _http: HttpClient,
		private _auth: AuthService,
		private _router: Router,
		private _err: HttpErrorService,
		private _toast: ToastService
	) { }

	ngOnInit(): void {
		if(this._auth.status()) this._router.navigateByUrl('/')
		
		this.loginForm = this._fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required])],
			remember: ['']
		})
	}

  	login () {
		this.loading = true
		this._http.post('login', this.loginForm.value)
					.pipe(catchError((error: HttpErrorResponse) => this.onError(error)))
					.subscribe(
						(res: any) => {
							this.loading = false
							if(res.data.token) this._auth.login(res.data.token, res.data.user)
							if(res.data.remember_token) this._auth.setRememberToken(res.data.remember_token)
							this._toast.success("Login Successful")
							return this._router.navigateByUrl('/')
						}
					)
  	}

	onError(err: any){
		this._err.onError(err, (errors, message) => {
			this.httpErrors = errors
			this.httpErrorMessage = message
			if(message) this._toast.error(message)
		})
		this.loading = false
		return throwError(() => new Error(err.message))
	}

}
