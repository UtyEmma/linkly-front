import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  passwordForm!: FormGroup
  httpErrors: any = {}
  httpErrorMessage: string = ""
  loading: boolean = false
  submitted = false

  constructor(
    private _fb: FormBuilder,
    private _err: HttpErrorService,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this.passwordForm = this._fb.group({
      current_password: ['', Validators.compose([Validators.required])],
      new_password: ['', Validators.compose([Validators.required])],
      new_password_confirmation: ['', Validators.compose([Validators.required])]
    })
  }

  updatePassword(){
    this.loading = true
    this.httpErrors = {}
    this._http.put(`user/password`, this.passwordForm.value)
              .pipe(catchError((error: HttpErrorResponse) => this.onError(error)))
              .subscribe( (res: any) => this.loading = false)
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
