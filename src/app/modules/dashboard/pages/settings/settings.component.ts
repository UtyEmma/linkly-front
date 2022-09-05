import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  page!: any
  infoForm!: FormGroup

  constructor(
    private _pageService: PageService,
    private _fb: FormBuilder,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this._pageService.current.subscribe(page => {
      this.page = page
      this.infoForm = this._fb.group({
        'title' : [page?.title, Validators.compose([Validators.required])],
        'slug': [page?.slug, Validators.compose([Validators.required])],
        'desc': [page?.desc]
      })
    })
  }

  updatePage(){
    this._http.put(`pages/${this.page?.unique_id}`, this.infoForm.value).subscribe(
      (res: any) => {
        if(res.data?.page) this._pageService.set(res.data?.page)
      }
    )
  }

}
