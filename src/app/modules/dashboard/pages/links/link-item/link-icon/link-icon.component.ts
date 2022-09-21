import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-link-icon',
  templateUrl: './link-icon.component.html',
  styleUrls: ['./link-icon.component.scss'],
})
export class LinkIconComponent implements OnInit {

  page: any
  @Input('link') link: any

  constructor(
    private _pageService : PageService,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    
    this._pageService.current.subscribe(page => this.page = page)
  }

  updateIcon(value: any){
    this._http.put(`links/${this.page.unique_id}/${this.link.unique_id}`, {
      thumbnail: 'icon',
      icon: value,
      title: this.link.title,
      url: this.link.url,
      status: this.link.status,
    }).subscribe(
      (res: any) => {
        this._pageService.set({
          ...this.page,
          links: res.data.links
        })
      }
    )  
  }

}
