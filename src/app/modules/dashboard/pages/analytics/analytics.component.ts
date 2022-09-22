import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/providers/services/pages/page.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {catchError, throwError} from 'rxjs'
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  page!: any 
  show: boolean = false
  
  activity : any = {
    clicks: [],
    visits: [],
    views: [],
  }

  countries: any

  devices: any = {
    mobile: {
      percent: 0,
      total: 0
    },
    tablet: {
      percent: 0,
      total: 0
    },
    desktop: {
      percent: 0,
      total: 0
    }
  }

  constructor(
    private _pageService: PageService,
    private _http: HttpClient,
    private _title: Title
  ) { }

  ngOnInit(): void {
    this._pageService.current.subscribe(page => {
      this.page = page
      this.loadStats()
      this._title.setTitle(`${page.title} - Analytics`)
    })
  }

  loadStats(){
    this._http.get(`pages/${this.page.unique_id}/stats`)
        .pipe(catchError(this.onError))
        .subscribe(
          (res: any) => {
            const activity : any = res.data.activity
            const devices: any[] = res.data.devices
            const countries: any[] = res.data.countries
            
            activity.map((value: any, index: number) => {
              this.activity.clicks.push(value.clicks)
              this.activity.visits.push(value.visits)
              this.activity.views.push(value.views)
            })
            
            devices.map((value) => {
              this.devices[value.device].percent = this.percentage(value.total, res.data.visits, true)
              this.devices[value.device].total = value.total
            })

            this.countries = countries.map((value) => {
              return {
                id: value.country_code,
                name: value.country,
                value: value.value
              }
            })

            this.show = true
          }
        )        
  }

  percentage(total: number, denominator: number, ceil: boolean = false){
    const percent = (total / denominator) * 100
    if(ceil) return Math.ceil(percent)
    return percent
  }

  onError(error: HttpErrorResponse){
    this.show = false
    return throwError(() => new Error())
  }

}
