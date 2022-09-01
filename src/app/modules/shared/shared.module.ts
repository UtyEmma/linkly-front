import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import * as FeatherIcons from 'angular-feather/icons';
import { ErrorComponent } from './components/error/error.component';


const Icons : any = FeatherIcons
@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(Icons)
  ],
  exports: [
    FeatherModule,
    ErrorComponent
  ]
})
export class SharedModule { }
