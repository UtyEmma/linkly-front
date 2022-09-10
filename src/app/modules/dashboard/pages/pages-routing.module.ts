import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LinksComponent } from './links/links.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: '', component: LinksComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'analytics', component: AnalyticsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
