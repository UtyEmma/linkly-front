import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LinksComponent } from './links/links.component';
import { SettingsComponent } from './settings/settings.component';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from '../dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FeatherModule } from 'angular-feather';
import * as FeatherIcons from 'angular-feather/icons';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { LinkItemComponent } from './links/link-item/link-item.component';
import {SharedModule as Shared} from '../../shared/shared.module';

const Icons : any = FeatherIcons


@NgModule({
  declarations: [
    LinksComponent,
    PagesComponent,
    SettingsComponent,
    LinkItemComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    Shared
  ],
  providers: [
    PageService
  ]
})
export class PagesModule { }
