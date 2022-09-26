import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, Observer, throwError } from 'rxjs';
import { ToastService } from 'src/app/providers/services/alert/toast.service';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

	appUrl = environment.appBaseURL
	recoverPasswordForm!: FormGroup
	loading: boolean = false
	httpErrors: any = {}
	httpErrorMessage: string = ""

	constructor(
		private _fb: FormBuilder, 
		private _http: HttpClient,
		private _auth: AuthService,
		private _router: Router,
		private _err: HttpErrorService,
		private _toast: ToastService,
		private _title: Title
	) { }

	ngOnInit(): void {
		this._title.setTitle(`Reset your Password`)
		this.recoverPasswordForm = this._fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			token: ['', Validators.compose([Validators.required])],
			password: ['', Validators.compose([Validators.required])],
			password_confirmation: ['', Validators.compose([Validators.required])],
		})
	}

  	login () {
		this.loading = true
		this._http.post('password/reset', this.recoverPasswordForm.value)
					.pipe(catchError((error: HttpErrorResponse) => this.onError(error)))
					.subscribe(
						(res: any) => {
							this.loading = false
							this._toast.success(res.data.message)
							return this._router.navigateByUrl('/password/reset')
						}
					)
  	}

	onError(err: any){
		this._err.onError(err, (errors, message) => {
			this.httpErrors = errors
			this.httpErrorMessage = message
			this._toast.error(message)
		})
		this.loading = false
		return throwError(() => new Error(err.message))
	}
}
