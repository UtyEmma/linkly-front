import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { throwError, catchError } from 'rxjs'
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { toFormData } from 'src/library/forms';
import * as _ from 'lodash'
import { toBase64 } from 'src/library/file';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  page!: any
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
    this._pageService.current.subscribe(page => {
      this.page = page
      this.infoForm = this._fb.group({
        'title' : [page?.title, Validators.compose([Validators.required])],
        'slug': [page?.slug, Validators.compose([Validators.required])],
        'desc': [page?.desc],
        'logo': ['']
      })
    })
  }

  updatePage(){
    this.loading = true
    this._http.post(`pages/update/${this.page?.unique_id}`, this.infoForm.value)
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
