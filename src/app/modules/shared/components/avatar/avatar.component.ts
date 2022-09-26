import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input('src') src: any = ''
  @Input('alt') alt: string = ''
  @Input('textSize') textSize = '4'
  @Input('className') className: string = "w-20"


  constructor() { }

  ngOnInit(): void { }

}
