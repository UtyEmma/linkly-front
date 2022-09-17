import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { StyleRenderer, lyl, WithStyles, ThemeRef, ThemeVariables } from '@alyle/ui';
import {
  ImgCropperConfig,
  ImgCropperEvent,
  LyImageCropper,
  ImgCropperErrorEvent,
  ImgCropperLoaderConfig,
  STYLES as CROPPER_STYLES
} from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';
import { LySliderChange } from '@alyle/ui/slider';

@Component({
  selector: 'app-img-resize',
  templateUrl: './img-resize.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgResizeComponent implements AfterViewInit {

  @Input('src') src: string = ""
  croppedImage?: string | null = null;
  scale!: number;
  ready = false;
  minScale!: number;
  @ViewChild(LyImageCropper) readonly cropper!: LyImageCropper;

  @Output() upload: EventEmitter<any> = new EventEmitter()
  
  myConfig: ImgCropperConfig = {
    // autoCrop: true,
    width: 150, // Default `250`
    height: 150, // Default `200`
    // fill: '#fff', // Default transparent if type == png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    responsiveArea: true,
    round: true
  };

  constructor(
    private _platform: Platform
  ) { }

  ngAfterViewInit() {

    // demo: Load image from URL and update position, scale & rotate
    // this is supported only for browsers
    if (this._platform.isBrowser) {
      const config: ImgCropperLoaderConfig = {
        scale: 0.745864772531767,
        xOrigin: 642.380608078103,
        yOrigin: 236.26357452128866,
        // areaWidth: 100,
        // areaHeight: 100,
        rotation: 0,
        originalDataURL: this.src,
        
      };
      this.cropper.loadImage(config);
    }

  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    console.log('cropped img: ', e);
  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }
  onSliderInput(event: LySliderChange) {
    this.scale = event.value as number;
  }

  reset(){
    this.croppedImage = null
  }

  uploadImage(){
    this.upload.emit(this.croppedImage)
  }

}