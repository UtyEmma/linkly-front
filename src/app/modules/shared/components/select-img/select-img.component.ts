import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.scss']
})
export class SelectImgComponent implements OnInit {

  @Input('src') src: string = ""
  @Input('alt') alt: string = ""
  @Input('name') name!: string

  @Output('change') change = new EventEmitter()

  @ViewChild('fileInput') input!: ElementRef<HTMLInputElement>

  constructor() { }

  ngOnInit(): void { }

  updateSrc(e: any){
    const file = e.target.files[0]
    const blob = URL.createObjectURL(file)
    this.src = blob
    this.change.emit(e)
  }

  removeImg(e: any){
    this.input.nativeElement.value = ""
    this.src = ""
  }

}
