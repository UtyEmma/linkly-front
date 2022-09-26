import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { catchError, Observable, of, throwError } from 'rxjs';
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  submitted: boolean = false
  loading: boolean = false
  httpErrors: any = {};
  httpErrorMessage: string = ""
  appUrl = environment.appBaseURL

  constructor(
	private _fb: FormBuilder, 
	private _http: HttpClient, 
	private _router: Router, 
	private _auth: AuthService,
	private _err: HttpErrorService,
	private _title: Title
	) { }

  ngOnInit(): void {
	if(this._auth.status()) this._router.navigateByUrl('/')
	this._title.setTitle(`Create your ${environment.appName} account`)
    this.registerForm = this._fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      password_confirmation: ['', Validators.compose([Validators.required])]
    })
  }

  	register(){
		this.submitted = true
		if(this.registerForm.valid){
			this.loading = true
			this._http.post('register', this.registerForm.value)
						.pipe(catchError((error: HttpErrorResponse) => this.onError(error)))
						.subscribe((res: any) => {
							this.loading = false
							this._auth.login(res.data.token, res.data.user)
							this._router.navigateByUrl('/')
						})
		}
	}
			
	onSuccess(res: any){

	}

	onError(err: HttpErrorResponse){
		this._err.onError(err, (errors, message) => {
			this.httpErrors = errors
			this.httpErrorMessage = message
		})
		this.loading = false
		return throwError(() => new Error(err.message))
	}

}
