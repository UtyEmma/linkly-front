import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input('name') name! : string;
  @Input('defaultChecked') defaultChecked! : boolean
  @Input('class') class!: string
  @Input('onChange') onChange!: any

  checked: boolean = this.defaultChecked || false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleSwitch(e: any){
    this.checked = e.target.checked
    this.onChange(e)
  }

}
