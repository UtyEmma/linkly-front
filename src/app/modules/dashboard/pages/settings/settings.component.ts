import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  page: any

  constructor(
    private _pageService: PageService,
    private _title: Title
  ) { }

  ngOnInit(): void {
    this._pageService.current.subscribe(page => {
      this.page = page
      this._title.setTitle(`${page.title} - Settings`)
    })
  }

}
