import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  newPageForm!: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.newPageForm = this._fb.group({
      title: ['', Validators.compose([Validators.required])],
      slug: ['', Validators.compose([Validators.required])],
      desc: ['', Validators.compose([Validators.maxLength(150)])]
    })
  }

  createPage(){
    this._http.post('pages', this.newPageForm.value).subscribe((res: any) => {
      const url = res?.data.page.slug
      return this._router.navigateByUrl(`/${url}`, {
        state: {
          page: res?.data.page
        }
      })
    })
  }

}
