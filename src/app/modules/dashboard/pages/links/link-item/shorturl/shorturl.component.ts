import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-shorturl',
  templateUrl: './shorturl.component.html',
  styleUrls: ['./shorturl.component.scss']
})
export class ShorturlComponent implements OnInit {

  // @Input() updateLink!: any

  @Input() link!: any
  @Input() linkData!: any

  shorturl!: any;

  page: any

  constructor(
    private _http: HttpClient,
    private _page: PageService
  ) { 
    this._page.current.subscribe(page => this.page = page)
  }

  ngOnInit(): void {
    this.shorturl = this.link.shorturl
  }

  updateShortURL(e: any){
    const {name, value} = e.target
    this.linkData[name] = value 
    this.link[name] = value
    this.shorturl = value
    this.update()
  }

  update(status: boolean = false,){
    this._http.put(`links/${this.page.unique_id}/${this.link.unique_id}`, {
      title: this.link.title,
      url: this.link.url,
      status: status ? this.link.status : null,
      image: this.link.image,
      shorturl: this.shorturl
    }).subscribe((res: any) => {
      this.shorturl = res.data?.link?.shorturl
    })
  }


  generateShortLink(){
    this._http.get(`links/${this.page.unique_id}/shorten`).subscribe(
      (res: any) => {
        this.shorturl = res.data?.shorturl
        this.update()
      }
    )
  }

}
