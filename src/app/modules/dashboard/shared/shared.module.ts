import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from '../dashboard.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { UserService } from 'src/app/providers/services/user/user.service';
import { RouterModule } from '@angular/router';
import {SharedModule as Shared} from '../../shared/shared.module';
import { NewPageComponent } from './new-page/new-page.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    NewPageComponent,
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    Shared,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FeatherModule,
    DashboardComponent,
    Shared,
    NewPageComponent
  ],
})
export class SharedModule { }
