import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageService } from 'src/app/providers/services/pages/page.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

export type LinkItemType = {
  title: string,
  url: string,
  shorturl: string,
  status: boolean,
  position: number,
  unique_id: string
}

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit, OnChanges {

  links: LinkItemType[] = []
  page: any
  loading: boolean = false

  linkData: any = {
    title: "",
    url: "",
    shorturl: "",
    status: 'draft'
  }

  constructor(
    private _pageService: PageService,
    private _http: HttpClient,
  ) { }

  ngOnInit(): void {
    this._pageService.current.subscribe(page => {
      this.page = page
      if(page){
        this.links = page?.links || []
        if(page?.links.length < 1) this.addLink()
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  addLink(){
    this.loading = true
    this._http.post(`links/${this.page.unique_id}`, this.linkData).subscribe(
      (res: any) => {
        this.links = res.data.links
        this.loading = false
      }
    )
  }

  update(link: any){
    this._http.put(`links/${this.page.unique_id}/${link.unique_id}`, {
      title: link.title,
      url: link.url,
      position: link.position,
      status: link.status
    }).subscribe((res: any) => {
      this._pageService.set({
        ...this.page, 
        links: res.data.links
      })
    })
  }

  updateOrder(){
    const ids = this.links.map(link => link.unique_id!);
    this._http.put(`links/${this.page.unique_id}/reorder`, {
      links: ids
    }).subscribe((res: any) => {
      this._pageService.set({
        ...this.page, 
        links: res.data.links
      })
    } )
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.links, event.previousIndex, event.currentIndex);
    this.updateOrder()
  }
}
