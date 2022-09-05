import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import * as FeatherIcons from 'angular-feather/icons';
import { ErrorComponent } from './components/error/error.component';
import { SwitchComponent } from './components/switch/switch.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';


const Icons : any = FeatherIcons
@NgModule({
  declarations: [
    ErrorComponent,
    SwitchComponent,
    IconPickerComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(Icons),
    TablerIconsModule.pick(TablerIcons)
  ],
  exports: [
    FeatherModule,
    ErrorComponent,
    SwitchComponent,
    TablerIconsModule,
    IconPickerComponent
  ]
})
export class SharedModule { }
