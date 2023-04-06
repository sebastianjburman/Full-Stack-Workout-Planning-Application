import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 175, 174, 173, 172, 170, 169, 167 ],
        label: 'Weight',
        fill: false,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgb(24, 71, 122)',
        pointBackgroundColor: 'rgb(24, 71, 122)',
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartLegend = true;

  constructor() { }

  ngOnInit(): void {
  }

}
