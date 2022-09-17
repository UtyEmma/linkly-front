import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _cookies from 'src/app/providers/providers/cookies.provider';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-link-page',
  templateUrl: './link-page.component.html',
  styleUrls: ['./link-page.component.scss']
})
export class LinkPageComponent implements OnInit {

  page!: any 
  slug!: string
  session_id!: string
  session_key: string = 'lly_sess_id'
  deviceInfo!: any

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private deviceService:  DeviceDetectorService,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((param: any) => this.slug = param.slug);
    this.session_id = _cookies.get(this.session_key)
    this._http.post(`page/${this.slug}`, {
      session: this.session_id,
      device: this.getDevice(),
      referrer: document.referrer
    }).subscribe(
      (res: any) => {
        this.page = res.data?.page
        _cookies.set(this.session_key, res.data?.session)
      }
    )
  }

  updateClick(link_id: string){
    this._http.post(`click/${this.page?.unique_id}`, {
      link_id: link_id,
      session_id: this.session_id
    }).subscribe((res) => {
      console.log(res)
    })
  }

  getDevice(){
    /**
     * desktop
     * mobile
     * tablet
     */
    this.deviceInfo = this.deviceService.getDeviceInfo();
    return this.deviceInfo.deviceType
  }

  

}
