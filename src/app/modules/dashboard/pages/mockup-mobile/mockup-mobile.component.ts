import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mockup-mobile',
  templateUrl: './mockup-mobile.component.html',
  styleUrls: ['./mockup-mobile.component.scss'],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 1}),
        animate(700)
      ]),
      transition(':leave', [
        animate(700, style({ transform: 'translateY(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class MockupMobileComponent implements OnInit {

  @Input('page') page!: any
  show: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  shareLink(){

  }

  toggle(state: boolean){
    this.show = state
  }
}
