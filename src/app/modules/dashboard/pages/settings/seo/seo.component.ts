import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { PageService } from 'src/app/providers/services/pages/page.service';
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { throwError, catchError } from 'rxjs'

@Component({
  selector: 'app-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {

  @Input('page') page! : any
  loading: boolean = false
  seoForm!: FormGroup
  httpErrors: any = {}
  httpErrorMessage: string = ""
  submitted: boolean = false

  constructor(
    private _pageService: PageService,
    private _fb : FormBuilder,
    private _http: HttpClient,
    private _err: HttpErrorService
  ) { }

  ngOnInit(): void {
    this.seoForm = this._fb.group({
      meta_title: [this.page?.meta_title],
      meta_desc: [this.page?.meta_desc],
      meta_tags: [this.page?.meta_tags]
    })
  }

  updateSEO(){
    this.loading = true
    this._http.put(`pages/${this.page?.unique_id}`, {
      ...this.seoForm.value,
      title: this.page?.title,
      slug: this.page?.slug,
      desc: this.page?.desc
    })
    .pipe(catchError((error: HttpErrorResponse) => this.onError(error)))
    .subscribe(
      (res: any) => {
        this._pageService.set(res.data?.page)
        this.loading = false
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
