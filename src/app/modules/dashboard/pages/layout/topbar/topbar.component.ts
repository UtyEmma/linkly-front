import { Component, OnInit, Input } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { environment } from 'src/environments/environment';
import { share } from 'src/library/navigator';
import Str from 'src/library/Str';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  appUrl = environment.appBaseURL
  
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
    const link = `${this.appUrl}/${this.page?.slug}`
    share(link, this.page.title)
  }


}
