import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { LinkItemType } from '../links.component';

type EditableRef = 'title' | 'url' | 'status';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss']
})


export class LinkItemComponent implements OnInit  {

  @ViewChild('linkTitle') linkTitle!: ElementRef

  page : any = null 
  title: boolean = true
  url: boolean = true
  status: boolean = true

  linkData: any = {
    title: "",
    url: "",
    shorturl: "",
    status: true
  }

  constructor(
    private _http: HttpClient,
    private _pageService: PageService
  ) { }

  ngOnInit(): void {
    this._pageService.current.subscribe((page) => this.page = page)

  }

  handleChange(e: any){
    
  }

  toggleInput(name: EditableRef, status: boolean) {
    this[name] = status
  }

  toggleStatus(e: any){    
    const checked = e.target.checked
    this.linkData.status = checked
  }

  updateLink(e: any){
    const {name, value} = e.target
    this.linkData[name] = value  
    this.toggleInput(name, true)
  }

  generateShortLink(){
    this._http.get(`links/${this.page.unique_id}/shorten`).subscribe(
      (res: any) => {
        this.linkData.shortlink = res.data?.shorturl
      }
    )
  }
}
