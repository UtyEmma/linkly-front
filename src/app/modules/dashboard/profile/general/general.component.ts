import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorService } from 'src/app/providers/services/http/errors/http-error.service';
import { UserService } from 'src/app/providers/services/user/user.service';
import {throwError, catchError} from 'rxjs'
import { toBase64 } from 'src/library/file';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  user!: any
  submitted = false
  profileForm!: FormGroup
  httpErrors: any = {}
  httpErrorMessage: string = ""
  loading: boolean = false

  constructor(
    private _user: UserService,
    private _fb: FormBuilder,
    private _err: HttpErrorService,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this._user.current.subscribe(user => {
      this.user = user
      this.profileForm = this._fb.group({
        'name' : [this.user?.name, Validators.compose([Validators.required])],
        'email': [this.user?.email, Validators.compose([Validators.required, Validators.email])],
        'image': []
      })
    })
    
  }

  updatePage(){
    this.loading = true
    this._http.put(`user/update`, this.profileForm.value)
    .pipe(catchError((error: HttpErrorResponse) => this.onError(error)))
    .subscribe(
      (res: any) => {
        if(res.data?.user) this._user.set(res.data?.user)
        this.loading = false
      }
    )
  }

  updateImg(e: any){
    if(e.target.files.length > 0){
      toBase64(e.target.files[0], (base64String: any) => 
        this.profileForm.patchValue({
          image: base64String
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
