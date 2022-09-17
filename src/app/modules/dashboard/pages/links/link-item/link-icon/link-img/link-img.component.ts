import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-link-img',
  templateUrl: './link-img.component.html',
  styleUrls: ['./link-img.component.scss'],
})
export class LinkImgComponent implements OnInit {
    
    page: any
    @Input('link') link : any

    constructor(
      private _http: HttpClient,
      private _pageService: PageService
      ) {}

    ngOnInit(): void {
      this._pageService.current.subscribe(page => this.page = page)
    }

    uploadImage(e: any){
      this._http.put(`links/${this.page.unique_id}/${this.link.unique_id}`, {
        thumbnail: 'image',
        icon: e,
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
      // console.log(e)
    }
}
