import { Element } from '@angular/compiler';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import * as TablerIcons from 'angular-tabler-icons/icons';
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
export class IconPickerComponent implements OnInit {

  @Input('name') name: string = ""
  icons!: IconType
  loading: boolean = false

  @Output() selected : EventEmitter<any> = new EventEmitter()

  picker!: HTMLDivElement
  current: string = ""

  iconInput: any

  constructor() { }

  ngOnInit(): void {
    this.icons = IconsSource
  }

  searchIcons(e: any){
    this.loading = true
    const keyword = e.target.value.toUpperCase()
    if(!keyword) this.icons = IconsSource

    for (const key in IconsSource) {
      if (Object.prototype.hasOwnProperty.call(IconsSource, key)) {
        const icon = IconsSource[key]
        const tags = icon.tags
        
        tags.map((tag) : void => {
          if(this.search(tag.toUpperCase(), keyword)) this.icons[key] = IconsSource[key]
        })
        
        if(this.search(icon.category.toUpperCase(), keyword)) this.icons[key] = IconsSource[key]
      }
    }

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
