import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { WelcomeComponent } from './home/components/welcome/welcome.component';
import { MainComponent } from './home/components/main/main.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    WelcomeComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PagesModule
  ],
  bootstrap: [ DashboardComponent ],
})
export class DashboardModule { }
