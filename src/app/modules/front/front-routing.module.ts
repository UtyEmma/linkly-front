import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LinkPageComponent } from './link-page/link-page.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: ':slug', component: LinkPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
