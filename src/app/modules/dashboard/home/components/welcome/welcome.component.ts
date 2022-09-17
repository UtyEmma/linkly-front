import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs'
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

	newPageForm!: FormGroup
	submitted: boolean = false
	loading = false
	httpErrors: any = {}
	httpErrorMessage = ""

	constructor(
		private _fb: FormBuilder,
		private _http: HttpClient,
		private _router: Router,
		private _err: HttpErrorService
	) { }

	ngOnInit(): void {
		this.newPageForm = this._fb.group({
		title: ['', Validators.compose([Validators.required])],
		slug: ['', Validators.compose([Validators.required])],
		desc: ['', Validators.compose([Validators.required, Validators.maxLength(150)])]
		})
	}

	createPage(){
		this.submitted = true
		this.loading = true
		if(this.newPageForm.valid){
			this._http.post('pages', this.newPageForm.value)
				.pipe(
					catchError(this.onError)
				)
				.subscribe((res: any) => {
					const url = res?.data.page.slug
					return this._router.navigateByUrl(`/${url}`, {
						state: {
							page: res?.data.page
						}
					})
				}
			)
		}
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
