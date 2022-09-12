import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input('name') name! : string;
  @Input('defaultChecked') defaultChecked : boolean = false
  @Input('class') class!: string
  @Input('onChange') onChange!: any
  @Input('disabled') disabled: any = false

  @Output() change: EventEmitter<any> = new EventEmitter()

  checked: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.checked = this.defaultChecked
  }

  toggleSwitch(e: any){
    if(this.disabled) return e.preventDefault()
    this.checked = e.target.checked
    this.change.emit(true)
  }

}
