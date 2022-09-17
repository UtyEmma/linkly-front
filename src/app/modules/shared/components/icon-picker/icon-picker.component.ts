import { Element } from '@angular/compiler';
import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { debounce } from 'src/library/optimization';
import { Icons } from './icon-tags';

type IconType = Record<string, {
  category: string,
  tags: string[],
  version: string,
  unicode: string
}>

const IconsSource : IconType = Icons

@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit{

  @Input('name') name: string = ""
  icons!: any[]
  loading: boolean = false

  @Output() selected : EventEmitter<any> = new EventEmitter()

  picker!: HTMLDivElement
  current: string = ""

  iconInput: any

  @ViewChild('scroll') scroll!: ElementRef<any>

  constructor() { }

  ngOnInit(): void {
    this.icons = Object.entries(IconsSource)
  }

  searchIcons(e: any){
    debounce(this.handleSearch(e), 2000)
  }

  handleSearch(e: any) : any{
    this.loading = true
    const keyword = e.target.value.toUpperCase()
    if(!keyword) this.icons = Object.entries(IconsSource)
    const icons: any = {}
    for (const key in IconsSource) {
      if (Object.prototype.hasOwnProperty.call(IconsSource, key)) {
        const icon = IconsSource[key]
        const tags = icon.tags
        
        tags.map((tag) : void => {
          if(this.search(tag.toUpperCase(), keyword)) icons[key] = IconsSource[key]
        })
        
        if(this.search(icon.category.toUpperCase(), keyword)) icons[key] = IconsSource[key]
      }
    }

    this.icons = Object.entries(icons)
    this.loading = false
  }

  assign(object: any, key: string){
    Object.assign(object, {
      [key] : IconsSource[key]
    })
  }

  search(needle: string, haystack: string){
    return needle.indexOf(haystack) > -1
  }

  select(key: string){
    this.current = key
    this.selected.emit(key)
  }

}
