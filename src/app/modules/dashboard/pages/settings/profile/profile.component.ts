import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { throwError, catchError } from 'rxjs'
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { toFormData } from 'src/library/forms';
import * as _ from 'lodash'
import { toBase64 } from 'src/library/file';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input('page') page: any
  appUrl = environment.appBaseURL
  infoForm!: FormGroup
  loading: boolean = false
  logo: any
  httpErrors: any = {}
  httpErrorMessage: string = ""
  submitted: boolean = false

  constructor(
    private _pageService: PageService,
    private _fb: FormBuilder,
    private _http: HttpClient,
    private _err: HttpErrorService
  ) { }

  ngOnInit(): void {
    this.infoForm = this._fb.group({
      'title' : [this.page?.title, Validators.compose([Validators.required])],
      'slug': [this.page?.slug, Validators.compose([Validators.required])],
      'desc': [this.page?.desc],
      'logo': ['']
    })
  }

  updatePage(){
    this.loading = true
    this._http.put(`pages/${this.page?.unique_id}`, this.infoForm.value)
    .pipe(catchError((error: HttpErrorResponse) => this.onError(error)))
    .subscribe(
      (res: any) => {
        if(res.data?.page) this._pageService.set(res.data?.page)
        this.loading = false
      }
    )
  }

  updateImg(e: any){
    if(e.target.files.length > 0){
      toBase64(e.target.files[0], (base64String: any) => 
        this.infoForm.patchValue({
          logo: base64String
        })
      )
    }
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
