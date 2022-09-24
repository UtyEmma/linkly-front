import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LinkPageComponent } from './link-page/link-page.component';
import { FeatherModule } from 'angular-feather';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './layouts/nav/nav.component';
import { HeroComponent } from './layouts/hero/hero.component';
import { AboutComponent } from './layouts/about/about.component';
import { FeaturesComponent } from './layouts/features/features.component';
import { DemoComponent } from './layouts/demo/demo.component';
import { StatsComponent } from './layouts/stats/stats.component';
import { FaqsComponent } from './layouts/faqs/faqs.component';
import { CtaComponent } from './layouts/cta/cta.component';
import { FooterComponent } from './layouts/footer/footer.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    LinkPageComponent,
    NavComponent,
    HeroComponent,
    AboutComponent,
    FeaturesComponent,
    DemoComponent,
    StatsComponent,
    FaqsComponent,
    CtaComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    FeatherModule,
    SharedModule
  ]
})
export class FrontModule { }
