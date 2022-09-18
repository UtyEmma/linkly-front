import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observer, throwError } from 'rxjs';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { IResponse } from 'src/types/http-response';

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

	constructor(
		private _fb: FormBuilder, 
		private _http: HttpClient,
		private _auth: AuthService,
		private _router: Router,
		private _err: HttpErrorService
	) { }

	ngOnInit(): void {
		this.loginForm = this._fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required])],
			remember: ['']
		})
	}

  	login () {
		this.loading = true
		// console.log(this.loginForm.value)
		this._http.post('login', this.loginForm.value)
					.pipe(catchError((error: HttpErrorResponse) => this.onError(error)))
					.subscribe(
						(res: any) => {
							this.loading = false
							if(res.data.token) this._auth.login(res.data.token, res.data.user)
							if(res.data.remember_token) this._auth.setRememberToken(res.data.remember_token)
							return this._router.navigateByUrl('/')
						}
					)
  	}

	onError(err: any){
		this._err.onError(err, (errors, message) => {
			this.httpErrors = errors
			this.httpErrorMessage = message
		})
		this.loading = false
		return throwError(() => new Error(err.message))
	}

}
