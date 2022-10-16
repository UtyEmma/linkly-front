import { Component, OnInit, Inject, NgZone, PLATFORM_ID, Input, AfterViewInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-location-chart',
  templateUrl: './location-chart.component.html',
  styleUrls: ['./location-chart.component.scss']
})
export class LocationChartComponent implements OnInit, AfterViewInit {

  private root!: am5.Root;
  @Input('stats') stats: any

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) { }

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.browserOnly(() => {
      let root = am5.Root.new("chartdiv");
      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          projection: am5map.geoNaturalEarth1(),
        })
      );

      chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ",]
        })
      );

      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        interactive: true
      });

      polygonSeries.data.setAll([{
        id: "US",
        polygonSettings: {
          fill: am5.color(0xFF3C38)
        }
      }, {
        id: "CA",
        polygonSettings: {
          fill: am5.color(0xA23E48)
        }
      }, {
        id: "MX",
        polygonSettings: {
          fill: am5.color(0xFF8C42)
        }
      }])
      // polygonSeries.mapPolygons.template.states.create("hover", {
      //   fill: am5.color(0x677935)
      // });


    })
  }

}
