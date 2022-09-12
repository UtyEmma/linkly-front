import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.scss']
})
export class SelectImgComponent implements OnInit {

  @Input('src') src: string = ""
  @Input('name') name: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  updateSrc(e: any){
    const file = e.target.files[0]
    const blob = URL.createObjectURL(file)
    console.log(blob)
    this.src = blob
  }

}
