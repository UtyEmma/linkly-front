import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import * as FeatherIcons from 'angular-feather/icons';
import { ErrorComponent } from './components/error/error.component';
import { SwitchComponent } from './components/switch/switch.component';
import { IconPickerComponent } from './components/icon-picker/icon-picker.component';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FormsModule } from '@angular/forms';
import { SelectImgComponent } from './components/select-img/select-img.component';
import { SafePipe } from './pipes/safe/safe.pipe';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { ModalComponent } from './components/modal/modal/modal.component';
import {DialogModule} from '@angular/cdk/dialog';
import { AvatarComponent } from './components/avatar/avatar.component';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { SvgPipe } from './pipes/svg/svg.pipe';
import { CropperComponent } from './components/cropper/cropper.component';

const Icons : any = FeatherIcons
@NgModule({
  declarations: [
    ErrorComponent,
    SwitchComponent,
    IconPickerComponent,
    DatepickerComponent,
    SelectImgComponent,
    SafePipe,
    ModalComponent,
    AvatarComponent,
    TagsInputComponent,
    SvgPipe,
    CropperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule.pick(Icons),
    TablerIconsModule.pick(TablerIcons),
    VirtualScrollerModule,
    DialogModule,
  ],
  exports: [
    FeatherModule,
    ErrorComponent,
    SwitchComponent,
    TablerIconsModule,
    IconPickerComponent,
    DatepickerComponent,
    SelectImgComponent,
    SafePipe,
    ModalComponent,
    AvatarComponent,
    TagsInputComponent,
    SvgPipe,
    CropperComponent
  ]
})
export class SharedModule { }
