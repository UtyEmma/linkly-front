import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { WelcomeComponent } from './home/components/welcome/welcome.component';
import { MainComponent } from './home/components/main/main.component';
import { UserService } from 'src/app/providers/services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {SharedModule as Shared} from '../shared/shared.module';
import { PageItemComponent } from './home/components/page-item/page-item.component';
import { NewPageComponent } from './home/components/new-page/new-page.component'


@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent,
    MainComponent,
    PageItemComponent,
    NewPageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PagesModule,
    ReactiveFormsModule,
    Shared
  ],
})
export class DashboardModule { }
