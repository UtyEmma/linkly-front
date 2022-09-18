import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as Tagify from '@yaireo/tagify';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent implements OnInit {

  @Input('defaultValue') defaultValue: string = "";
  @ViewChild('input') input!: ElementRef<HTMLInputElement>
  
  tagify: any
  name: string = ""
  
  constructor() { }

  ngOnInit(): void {
    this.tagify = new Tagify(this.input.nativeElement)
  }

}
