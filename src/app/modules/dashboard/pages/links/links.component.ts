import { Component, OnInit } from '@angular/core';
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
export class LinksComponent implements OnInit {

  links: LinkItemType[] = []

  linkData: any = {
    title: "",
    url: "",
    shorturl: "",
    status: true
  }

  constructor(
    private _pageService: PageService
  ) { }

  ngOnInit(): void {
    this._pageService.current.subscribe(page => {
      this.links = page!.links
    })

    console.log(this.links);
    console.log(this.links.length);

    if(this.links.length < 1) this.links.push(this.linkData)
  }

}
