import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-shorturl',
  templateUrl: './shorturl.component.html',
  styleUrls: ['./shorturl.component.scss']
})
export class ShorturlComponent implements OnInit {

  @Input() updateLink!: any

  @Input() link!: any
  @Input() linkData!: any

  page: any

  constructor(
    private _http: HttpClient,
    private _page: PageService
  ) { 
    this._page.current.subscribe(page => this.page = page)
  }

  ngOnInit(): void {

  }

  generateShortLink(){
    this._http.get(`links/${this.page.unique_id}/shorten`).subscribe(
      (res: any) => this.linkData.shortlink = res.data?.shorturl
    )
  }

}
