import { Component, OnInit } from '@angular/core';
import * as TablerIcons from 'angular-tabler-icons/icons';


@Component({
  selector: 'app-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(TablerIcons);
    
  }

}
