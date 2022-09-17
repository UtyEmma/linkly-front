import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { PageService } from 'src/app/providers/services/pages/page.service';

type ILabels = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'

@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.scss']
})
export class ActivityChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  show: boolean = false
  stats : any = {
    clicks: [],
    visits: [],
    views: [],
  }

  page!: any
  labels: ILabels[] = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

  constructor(
    private _http: HttpClient,
    private _page: PageService
  ){}

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  ngOnInit(){
    this._page.current.subscribe(page => {
      this.page = page
      this.loadStats()
    })
  }

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.labels,
    datasets: [
      { data: this.stats.visits, label: 'Visits' },
      { data: this.stats.views, label: 'Views' },
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  loadStats(){
    this._http.get(`pages/${this.page.unique_id}/stats`)
        .subscribe(
          (res: any) => {
            const activity : any = res.data.activity
            activity.map((value: any, index: number) => {
              this.stats.clicks.push(value.clicks)
              this.stats.visits.push(value.visits)
              this.stats.views.push(value.views)
            })
            this.show = true
          }
        )        
  }

  parseDatasets(){
    this.labels.map((value) => {
      return {
        
      }
    })
  }

}
