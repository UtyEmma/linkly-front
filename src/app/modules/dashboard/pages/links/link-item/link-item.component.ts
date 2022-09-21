import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, ViewChildren, AfterViewInit, SimpleChanges, ViewChild } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';

type EditableRef = 'title' | 'url' | 'status';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ height: 0 }),
        animate(300, style({height: '*'})),
      ]),
      transition(':leave', [
        animate(300, style({ height: 0}))
      ])
    ])
  ]
})


export class LinkItemComponent implements OnInit, OnChanges, AfterViewInit  {

  @ViewChild('linkTitle') linkTitle!: ElementRef<HTMLInputElement>
  @ViewChild('linkUrl') linkUrl!: ElementRef<HTMLInputElement>

  @Input() link! : any;
  @Input() dragHandle! : CdkDragHandle;

  @ViewChildren("togglelinkTitle") togglelinkTitle!: QueryList<ElementRef>;
  @ViewChildren("togglelinkUrl") togglelinkUrl!: QueryList<ElementRef>;

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

  ngAfterViewInit(){
    this.togglelinkTitle.changes.subscribe(() => {
      this.linkTitle && this.linkTitle.nativeElement.focus()
    });

    this.togglelinkUrl.changes.subscribe(() => {
      this.linkUrl && this.linkUrl.nativeElement.focus()
    });
  }

  ngOnInit(): void {
    this._pageService.current.subscribe((page) => this.page = page)
  }
  
  handleChange(e: any){
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  toggleInput(name: EditableRef, status: boolean, element?: 'linkTitle' | 'linkUrl') {
    this[name] = status
    if(element && this[element]) this[element].nativeElement.focus()
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
      shorturl: this.link.shorturl
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
