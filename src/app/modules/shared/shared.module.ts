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
import { ImgResizeComponent } from './components/img-resize/img-resize.component';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { LySliderModule } from '@alyle/ui/slider';
import { LyTheme2, LY_THEME, LY_THEME_NAME } from '@alyle/ui';
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { ModalComponent } from './components/modal/modal/modal.component';
import {DialogModule} from '@angular/cdk/dialog';
import { AvatarComponent } from './components/avatar/avatar.component';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { SvgPipe } from './pipes/svg/svg.pipe';

const Icons : any = FeatherIcons
@NgModule({
  declarations: [
    ErrorComponent,
    SwitchComponent,
    IconPickerComponent,
    DatepickerComponent,
    SelectImgComponent,
    SafePipe,
    ImgResizeComponent,
    ModalComponent,
    AvatarComponent,
    TagsInputComponent,
    SvgPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule.pick(Icons),
    TablerIconsModule.pick(TablerIcons),
    VirtualScrollerModule,
    LyImageCropperModule,
    LySliderModule,
    DialogModule
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
    ImgResizeComponent,
    ModalComponent,
    AvatarComponent,
    TagsInputComponent,
    SvgPipe
  ],
  providers: [
    [ LyTheme2 ],
    // Theme that will be applied to this module
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
    // Gestures
  ]
})
export class SharedModule { }
