import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-mockup',
  templateUrl: './mockup.component.html',
  styleUrls: ['./mockup.component.scss']
})
export class MockupComponent implements OnInit, AfterViewInit {

  @Input('page') page!: any

  constructor(
    private _pageService: PageService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // this._pageService.current.subscribe(page => this.page = page)
  }


}
