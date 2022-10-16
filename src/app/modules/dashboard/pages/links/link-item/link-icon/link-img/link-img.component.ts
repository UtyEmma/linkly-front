import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CropperComponent } from 'src/app/modules/shared/components/cropper/cropper.component';
import { PageService } from 'src/app/providers/services/pages/page.service';

@Component({
  selector: 'app-link-img',
  templateUrl: './link-img.component.html',
  styleUrls: ['./link-img.component.scss'],
})
export class LinkImgComponent implements OnInit {
    
    page: any
    @ViewChild('cropper') cropper!: CropperComponent
    @Input('link') link : any
    croppedImg: string | SafeUrl = ''
    img: string | SafeUrl = '/assets/images/man-with-phone.jpg'
    file: any


    constructor(
      private _http: HttpClient,
      private _pageService: PageService,
      private sanitizer: DomSanitizer
      ) {}

    ngOnInit(): void {
      this._pageService.current.subscribe(page => this.page = page)
    }

    uploadImage(e: any){
      this._http.put(`links/${this.page.unique_id}/${this.link.unique_id}`, {
        thumbnail: 'image',
        icon: this.file,
        title: this.link.title,
        url: this.link.url,
        status: this.link.status,
      }).subscribe(
        (res: any) => {
          this._pageService.set({
            ...this.page,
            links: res.data.links
          })
        }
      ) 
    }

    crop(){
      this.cropper.exportCanvas()
    }

    getImage(event: any){
      const result = this.cropper!.cropper!.getCroppedCanvas().toDataURL('image/png')
      this.file = result
      this.croppedImg = result
    }

    changeImg(e: any){
      this.img = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[0]))
    }

    reset(){
      this.img = '/assets/images/man-with-phone.jpg'
      this.croppedImg = ""
    }
}
