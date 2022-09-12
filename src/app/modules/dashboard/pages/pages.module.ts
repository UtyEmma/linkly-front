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
import { MockupComponent } from './mockup/mockup.component';
import { ShorturlComponent } from './links/link-item/shorturl/shorturl.component';
import { LinkIconComponent } from './links/link-item/link-icon/link-icon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ActivityChartComponent } from './analytics/activity-chart/activity-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { BackgroundComponent } from './settings/theme/background/background.component';
import { AppearanceComponent } from './appearance/appearance.component';

const Icons : any = FeatherIcons

@NgModule({
  declarations: [
    LinksComponent,
    PagesComponent,
    SettingsComponent,
    LinkItemComponent,
    MockupComponent,
    ShorturlComponent,
    LinkIconComponent,
    AnalyticsComponent,
    ActivityChartComponent,
    BackgroundComponent,
    AppearanceComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    Shared,
    DragDropModule,
    NgApexchartsModule,
    NgChartsModule
  ],
  providers: [
    PageService
  ]
})
export class PagesModule { }
