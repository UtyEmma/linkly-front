import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  slug: any
  page: any
  state : any

  

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _pageService: PageService
  ) { 
    this.state = this._router.getCurrentNavigation()?.extras?.state
  }

  ngOnInit(): void {  
    this._route.params.subscribe((param: any) => this.slug = param.page);
    this._pageService.current.subscribe((page) => {
      this.page = page
    })
    this.loadPage()
  }

  loadPage(){
    if(this.state?.page) return this._pageService.set(this.state?.page)
    if(!this.page) this._http.get(`pages/${this.slug}`).subscribe((res: any) => this._pageService.set(res.data.page))
  }

}
