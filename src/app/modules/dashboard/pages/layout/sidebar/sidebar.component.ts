import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { UserService } from 'src/app/providers/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  page: any
  pages: any[] = []
  @Input('slug') slug: any

  constructor(
    private _page: PageService,
    private _user: UserService
  ) { 
  }
  
  ngOnInit(): void {
    this._page.current.subscribe(page => this.page = page)
    this._user.current.subscribe((user: any) => {
      this.pages = user?.pages
    })
  }

}
