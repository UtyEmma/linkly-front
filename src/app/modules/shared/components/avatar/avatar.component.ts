import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input('src') src!: string
  @Input('alt') alt!: string
  @Input('className') className: string = "w-20"


  constructor() { }

  ngOnInit(): void {
  }

}
