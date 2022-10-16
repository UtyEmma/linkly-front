import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { LinkPageComponent } from './link-page/link-page.component';
import { FeatherModule } from 'angular-feather';
import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './layouts/about/about.component';
import { CtaComponent } from './layouts/cta/cta.component';
import { DemoComponent } from './layouts/demo/demo.component';
import { FaqsComponent } from './layouts/faqs/faqs.component';
import { FeaturesComponent } from './layouts/features/features.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeroComponent } from './layouts/hero/hero.component';
import { NavComponent } from './layouts/nav/nav.component';
import { StatsComponent } from './layouts/stats/stats.component';
import { LandingPageComponent } from './landing-page/landing-page.component'


@NgModule({
  declarations: [
    LinkPageComponent,
    AboutComponent,
    CtaComponent,
    DemoComponent,
    FaqsComponent,
    FeaturesComponent,
    FooterComponent,
    HeroComponent,
    NavComponent,
    StatsComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    FeatherModule,
    SharedModule
  ]
})
export class FrontModule { }
