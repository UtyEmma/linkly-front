import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs'
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { UserService } from 'src/app/providers/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit {

	@Input('id') id = 'new-page-modal'
	newPageForm!: FormGroup
	appURL = environment.appBaseURL
	submitted: boolean = false
	loading = false
	httpErrors: any = {}
	httpErrorMessage = ""

	constructor(
		private _fb: FormBuilder,
		private _http: HttpClient,
		private _router: Router,
		private _err: HttpErrorService,
    private _userService: UserService
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
          
          this._userService.current.subscribe((user) => {
            this._userService.set({
              ...user,
              pages: res.data.pages
            })
          })
					
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
