import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-page-item',
  templateUrl: './page-item.component.html',
  styleUrls: ['./page-item.component.scss']
})
export class PageItemComponent implements OnInit {

  appUrl = environment.appBaseURL
  @Input() page: any

  constructor() { }

  ngOnInit(): void {
  }

}
