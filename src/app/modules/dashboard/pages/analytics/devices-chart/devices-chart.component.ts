import { Component, OnInit, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-devices-chart',
  templateUrl: './devices-chart.component.html',
  styleUrls: ['./devices-chart.component.scss']
})
export class DevicesChartComponent implements OnInit {

  @Input('stats') stats!: any 
  public doughnutChartLabels: string[] = [ 'Mobile', 'Tablet', 'Desktop' ];
  public doughnutChartData!: ChartData<'doughnut'> 
  public doughnutChartType: ChartType = 'doughnut';

  hasStats!: any

  constructor() { }

  ngOnInit(): void {
    this.hasStats = (this.stats.mobile.total || this.stats.desktop.total || this.stats.tablet.total)
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [this.stats.mobile.total, this.stats.tablet.total, this.stats.desktop.total] }
      ]
    };
  }


  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }





}
