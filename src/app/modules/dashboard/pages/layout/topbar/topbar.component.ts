import { Component, OnInit, Input } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';
import Str from 'src/library/Str';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  page: any
  @Input('slug') slug: any
  @Input('title') title: any
  @Input('subtitle') subtitle: any

  constructor(
    private _page: PageService
  ) { 
    this._page.current.subscribe(page => this.page = page)
  }

  ngOnInit(): void {

  }

  copyLink(link: string){
    Str.parse(link).copy()
  }  
  
  shareLink(){
    const link = `http://localhost:4200/${this.page?.slug}`
    Str.parse(link).share({
      title: this.page?.title,
      text: "Share two"
    })
  }


}
