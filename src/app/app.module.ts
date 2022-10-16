import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { SharedModule } from './modules/shared/shared.module';
import { INTERCEPTORS } from './providers/interceptors/interceptor.provider';
import { UserService } from './providers/services/user/user.service';
import { FrontModule } from './modules/front/front.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecoverPasswordComponent } from './modules/auth/recover-password/recover-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { AppService } from './providers/services/app/app.service';
import { ToastService } from './providers/services/alert/toast.service';
import SocialAuthConfig from './providers/providers/social-auth.provider';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { GoogleAuthComponent } from './modules/auth/components/google-auth/google-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent,
    GoogleAuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FrontModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [
    ToastService,
    INTERCEPTORS,
    UserService,
    AppService,
    SocialAuthConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
