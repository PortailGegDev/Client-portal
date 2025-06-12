import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { shortFrenchMonth } from '../../../shared/utils/date-utilities';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  
  constructor() { }

  initChartConsumptionDataByMonth(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[], gazConsumptions: ChartConsumption[]): any {
    let chartResult: any = {
      labels: shortFrenchMonth,
      datasets: [
        {
          type: 'line',
          label: 'Données météo',
          borderColor: 'darkgray',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [1, 5, 12, 17, 12, 30, 35, 30, 25, 17, 12, 3],
          yAxisID: 'y1' // Lie la courbe à l'axe `y1`
        }
      ]
    };

    if (hcConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        borderRadius: 5,
        label: 'Heures creuses',
        backgroundColor: '#0DB58D',
        data: [
          hpConsumptions.find(item => item.monthNumber === 1)?.value,
          hpConsumptions.find(item => item.monthNumber === 2)?.value,
          hpConsumptions.find(item => item.monthNumber === 3)?.value,
          hpConsumptions.find(item => item.monthNumber === 4)?.value,
          hpConsumptions.find(item => item.monthNumber === 5)?.value,
          hpConsumptions.find(item => item.monthNumber === 6)?.value,
          hpConsumptions.find(item => item.monthNumber === 7)?.value,
          hpConsumptions.find(item => item.monthNumber === 8)?.value,
          hpConsumptions.find(item => item.monthNumber === 9)?.value,
          hpConsumptions.find(item => item.monthNumber === 10)?.value,
          hpConsumptions.find(item => item.monthNumber === 11)?.value,
          hpConsumptions.find(item => item.monthNumber === 12)?.value,
        ],
        borderColor: '#FF6C00',
      });
    }

    if (hpConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        borderRadius: 5,
        label: 'Heures pleines',
        backgroundColor: '#FF6C00',
        data: [
          hcConsumptions.find(item => item.monthNumber === 1)?.value,
          hcConsumptions.find(item => item.monthNumber === 2)?.value,
          hcConsumptions.find(item => item.monthNumber === 3)?.value,
          hcConsumptions.find(item => item.monthNumber === 4)?.value,
          hcConsumptions.find(item => item.monthNumber === 5)?.value,
          hcConsumptions.find(item => item.monthNumber === 6)?.value,
          hcConsumptions.find(item => item.monthNumber === 7)?.value,
          hcConsumptions.find(item => item.monthNumber === 8)?.value,
          hcConsumptions.find(item => item.monthNumber === 9)?.value,
          hcConsumptions.find(item => item.monthNumber === 10)?.value,
          hcConsumptions.find(item => item.monthNumber === 11)?.value,
          hcConsumptions.find(item => item.monthNumber === 12)?.value,
        ]
      });
    }

    if (gazConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        borderRadius: 5,
        label: 'Gaz',
        backgroundColor: '#00AFCB',
        data: [
          gazConsumptions.find(item => item.monthNumber === 1)?.value,
          gazConsumptions.find(item => item.monthNumber === 2)?.value,
          gazConsumptions.find(item => item.monthNumber === 3)?.value,
          gazConsumptions.find(item => item.monthNumber === 4)?.value,
          gazConsumptions.find(item => item.monthNumber === 5)?.value,
          gazConsumptions.find(item => item.monthNumber === 6)?.value,
          gazConsumptions.find(item => item.monthNumber === 7)?.value,
          gazConsumptions.find(item => item.monthNumber === 8)?.value,
          gazConsumptions.find(item => item.monthNumber === 9)?.value,
          gazConsumptions.find(item => item.monthNumber === 10)?.value,
          gazConsumptions.find(item => item.monthNumber === 11)?.value,
          gazConsumptions.find(item => item.monthNumber === 12)?.value,
        ],
        borderColor: '#00AFCB'
      });
    }

    return chartResult;
  }

  initChartConsumptionDataByYear(groppedConsumptionsByYear: any): any {

    // Extraire les années triées
    const years = Object.keys(groppedConsumptionsByYear).map(y => parseInt(y)).sort((a, b) => a - b);

    return {
      labels: years.map(y => y.toString()), // Les labels sont les années
      datasets: [
        {
          type: 'bar',
          label: 'Heures creuses',
          backgroundColor: '#0DB58D',
          data: years.map(y => groppedConsumptionsByYear[y].hp) // Somme des valeurs HP par année
        },
        {
          type: 'bar',
          borderRadius: 5,
          label: 'Heures pleines',
          backgroundColor: '#FF6C00',
          data: years.map(y => groppedConsumptionsByYear[y].hc) // Somme des valeurs HC par année
        }
      ]
    };
  }
}
