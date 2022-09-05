import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { LinkItemType } from '../links.component';

type EditableRef = 'title' | 'url' | 'status';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block',
      })),
      state('closed', style({
        display: 'none'
      })),
      transition('open => closed', [
        animate('2s')
      ]),
      transition('closed => open', [
        animate('2s')
      ]),
    ]),
  ],
  styleUrls: ['./link-item.component.scss']
})


export class LinkItemComponent implements OnInit, OnChanges  {

  @ViewChild('linkTitle') linkTitle!: ElementRef
  @ViewChild('linkUrl') linkUrl!: ElementRef

  @Input() link! : any;

  page : any = null 
  title: boolean = true
  url: boolean = true
  status: boolean = true

  expansion: string = ''
  expansionTitle: string = ''

  linkData: any = {
    title: "",
    url: "",
    shorturl: "",
    status: 'draft'
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
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  toggleInput(name: EditableRef, status: boolean, element?: 'linkTitle' | 'linkUrl') {
    this[name] = status
    if(element && this[element]) console.log(this[element].nativeElement.focus())
  }

  toggleStatus(e: any){    
    if(!this.isPublishable()) return 
    this.link.status = e.target.checked ? 'published' : 'draft'
    this.linkData.status = e.target.checked ? 'published' : 'draft'
    this.update(true)
  }

  isPublishable() : boolean {
    return !!this.link.title && !!this.link.url
  }

  updateLink(e: any){
    const {name, value} = e.target
    this.linkData[name] = value 
    this.link[name] = value
    this.update()
    this.toggleInput(name, true)
  }

  update(status: boolean = false){
    this._http.put(`links/${this.page.unique_id}/${this.link.unique_id}`, {
      title: this.link.title,
      url: this.link.url,
      status: status ? this.link.status : null,
      image: this.link.image,
    }).subscribe((res: any) => {
      this._pageService.set({
        ...this.page, 
        links: res.data.links
      })
    })
  }

  deleteLink(){
    this._http.delete(`links/${this.page.unique_id}/${this.link.unique_id}`).subscribe(
      (res: any) => {
        this._pageService.set({
          ...this.page, 
          links: res.data.links
        })
      }
    )
  }

  toggleExpansion(toggler: 'shorturl' | 'linkIcon', title: string){
    this.expansion = toggler
    this.expansionTitle = title
  }

  closeExpansion(){
    this.expansion = ''
  }

}
