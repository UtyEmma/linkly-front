import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LinkPageComponent } from './link-page/link-page.component';
import { FeatherModule } from 'angular-feather';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LandingPageComponent,
    LinkPageComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    FeatherModule,
    SharedModule
  ]
})
export class FrontModule { }
