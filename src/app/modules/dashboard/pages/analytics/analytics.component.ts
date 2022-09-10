import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  page!: any 
  constructor(
    private _pageService: PageService
  ) { }

  ngOnInit(): void {
    this._pageService.current.subscribe(page => this.page = page)
  }

}
