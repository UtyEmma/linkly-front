import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from '../dashboard.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { UserService } from 'src/app/providers/services/user/user.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FeatherModule,
    DashboardComponent
  ],
})
export class SharedModule { }
