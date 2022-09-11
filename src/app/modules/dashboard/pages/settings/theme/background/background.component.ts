import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  @Input('name') name!: string;
  @Input('value') value!: string
  @Input('checked') checked: boolean = false
  
  constructor() { }

  ngOnInit(): void {
  }

  handleCheck(e: any){
    this.checked = e.target.checked
  }

}
