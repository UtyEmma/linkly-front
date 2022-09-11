import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import * as FeatherIcons from 'angular-feather/icons';
import { ErrorComponent } from './components/error/error.component';
import { SwitchComponent } from './components/switch/switch.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FormsModule } from '@angular/forms';
import { SelectImgComponent } from './components/select-img/select-img.component';


const Icons : any = FeatherIcons
@NgModule({
  declarations: [
    ErrorComponent,
    SwitchComponent,
    IconPickerComponent,
    DatepickerComponent,
    SelectImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule.pick(Icons),
    TablerIconsModule.pick(TablerIcons)
  ],
  exports: [
    FeatherModule,
    ErrorComponent,
    SwitchComponent,
    TablerIconsModule,
    IconPickerComponent,
    DatepickerComponent,
    SelectImgComponent
  ]
})
export class SharedModule { }
