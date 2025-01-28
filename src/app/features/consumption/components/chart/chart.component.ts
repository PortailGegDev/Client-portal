import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { Consumption } from '../../../../shared/models/consumption.model';
import { frenchMonth } from '../../../../shared/utils/date-utilities';

@Component({
  selector: 'app-consumption-chart',
  imports: [PanelModule, ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class AppConsumptionChartComponent implements OnChanges {
  @Input() consumptions: ChartConsumption[] | null = null;

  hcConsumptions: ChartConsumption[] = [];
  hpConsumptions: ChartConsumption[] = [];

  data: any;
  options: any;

  ngOnChanges() {
    if (this.consumptions) {

      // TODO: A Supprimer 
      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 12,
        value: 200,
        idSeasonal: 'HP'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 12,
        value: 134,
        idSeasonal: 'HC'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 9,
        value: 123,
        idSeasonal: 'HP'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 9,
        value: 130,
        idSeasonal: 'HC'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 8,
        value: 120,
        idSeasonal: 'HP'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 8,
        value: 90,
        idSeasonal: 'HC'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 12,
        value: 200,
        idSeasonal: 'HP'
      });

      this.hcConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HC');
      this.hpConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HP');

      debugger
      this.initChart();
    }

  }

  initChart() {
    this.data = {
      labels: frenchMonth,
      datasets: [
        {
          type: 'line',
          label: 'Données météo',
          borderColor: 'gray',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42, 0, 0, 0, 0, 0]
        },
        {
          type: 'bar',
          label: 'Heures pleines',
          backgroundColor: '#FF6C00',
          data: [
            this.hpConsumptions.find(item => item.monthNumber === 1)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 2)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 3)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 4)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 5)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 6)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 7)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 8)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 9)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 10)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 11)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 12)?.value,
          ],
          borderColor: '#FF6C00'
        },
        {
          type: 'bar',
          label: 'Heures creuses',
          backgroundColor: '#0DB58D',
          data: [
            this.hcConsumptions.find(item => item.monthNumber === 1)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 2)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 3)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 4)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 5)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 6)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 7)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 8)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 9)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 10)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 11)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 12)?.value,
          ]
        },
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: 'black'
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: 'gray'
          },
          grid: {
            display: false,
          }
        },
        y: {
          stacked: true,
          ticks: {
            color: 'gray'
          },
          grid: {
            color: 'lightgray',
            drawBorder: false
          }
        }
      }
    };
  }
}
