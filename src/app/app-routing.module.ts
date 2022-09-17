import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { subdomain } from 'src/library/url';
import { LoginComponent } from './modules/auth/login/login.component';
import { RecoverPasswordComponent } from './modules/auth/recover-password/recover-password.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { AuthGuard } from './providers/guards/auth/auth.guard';

const dashboardRoutes : Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'password/recover', component: RecoverPasswordComponent},
  {path: 'password/reset', component: ResetPasswordComponent},
  { path: '', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
]

const frontPageRoute : Routes = [
  { path: '', loadChildren: () => import('./modules/front/front.module').then(m => m.FrontModule) },
]

const appRoutes = () : Routes => {
  const {value, exists} = subdomain()
  if(exists && value === 'app') {
    return dashboardRoutes
  }
  return frontPageRoute
}

@NgModule({
  imports: [RouterModule.forRoot(appRoutes())],
  exports: [RouterModule]
})
export class AppRoutingModule { }
