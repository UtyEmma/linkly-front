import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { PageService } from 'src/app/providers/services/pages/page.service';

type ILabels = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'

type ChartDataType = Record<string, any[]>

@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.scss']
})
export class ActivityChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  show: boolean = false
  @Input('stats') stats!: any
  
  labels: ILabels[] = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  public barChartData!: ChartData<'bar' | 'line'>
  
  constructor(

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
    this.barChartData = {
      labels: this.labels,
      datasets: [
        { data: this.stats.visits, label: 'Visits', type: 'bar' },
        { data: this.stats.views, label: 'Views', type: 'bar' },
        {data: this.stats.clicks, label: 'Clicks', type: 'line'}
      ],
    };
  }

  // public barChartType: ChartType = 'line';
  public barChartPlugins = [
    DataLabelsPlugin
  ];


  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

}
