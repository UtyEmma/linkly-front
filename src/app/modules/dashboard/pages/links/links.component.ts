import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageService } from 'src/app/providers/services/pages/page.service';

export type LinkItemType = {
  title: string,
  url: string,
  shorturl: string,
  status: boolean
}

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnChanges {

  links: LinkItemType[] = []
  page: any

  linkData: any = {
    title: "",
    url: "",
    shorturl: "",
    status: 'draft'
  }

  constructor(
    private _pageService: PageService,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    this._pageService.current.subscribe(page => {
      this.page = page
      console.log(page?.links)
      this.links = page?.links || []
      if(this.links.length < 1) this.addLink()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  addLink(){
    this._http.post(`links/${this.page.unique_id}`, this.linkData).subscribe(
      (res: any) => {
        this.links = res.data.links
      }
    )
  }
}
