import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { subdomain } from 'src/library/url';
import { LoginComponent } from './modules/auth/login/login.component';

const routes : Routes = [
  {path: 'login', component: LoginComponent},
  { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
