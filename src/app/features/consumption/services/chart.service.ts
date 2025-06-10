import { Injectable } from '@angular/core';
import { Chart, Title } from 'chart.js';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { shortFrenchMonth } from '../../../shared/utils/date-utilities';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  options: any = null;

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

  initChartConsumptionByYearElec(groupedData: any, data: any): any {
    const years = Object.keys(groupedData).map(Number).sort(); // Labels (années)
    const hpValues = years.map(year => groupedData[year].hp); // Données HP
    const hcValues = years.map(year => groupedData[year].hc); // Données HC

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            title: (tooltipItem: any) => `Année: ${tooltipItem[0].label}`,
            label: (tooltipItem: any) => {
              const year = parseInt(tooltipItem.label);
              return [
                `Heures pleines: ${groupedData[year].hc} kWh`,
                `Heures creuses: ${groupedData[year].hp} kWh`,
                `Total: ${groupedData[year].hc + groupedData[year].hp} kWh`
              ];
            }
          },
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: '#FF6C00',
          borderWidth: 2,
          padding: 10,
          caretSize: 5,
          position: 'nearest',
          displayColors: false
        },
        legend: {
          position: 'bottom',
          align: 'end',
          labels: {
            generateLabels: (chart: Chart) => [
              { text: 'LEGENDE :', fillStyle: 'transparent', hidden: false },
              ...Chart.defaults.plugins.legend.labels.generateLabels(chart)
            ],
            boxWidth: 10,
            padding: 15
          }
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: 'black',
          font: { weight: 'bold', size: 13 },
          formatter: (value: number, context: any) => {
            if (context.datasetIndex === 1) {
              const index = context.dataIndex;
              const total = hpValues[index] + hcValues[index];
              return `${total.toLocaleString()} kWh`;
            }
            return ''; // Ne rien afficher sur l'autre série
          }
        }

      },
      scales: {
        x: { stacked: true, ticks: { color: 'gray' }, grid: { display: false }, barPercentage: 0.5, categoryPercentage: 0.6 },
        y: {
          stacked: true,
          ticks: { color: 'gray' },
          grid: { color: '#f3f3f3', drawBorder: false }
        }
      },
      labels: years,
      datasets: [
        { type: 'bar', label: 'Heures creuses', backgroundColor: '#0DB58D', data: hpValues },
        { type: 'bar', label: 'Heures pleines', backgroundColor: '#FF6C00', data: hcValues ,borderRadius: 5,}
      ]
    };
  }

  initChartConsumptionByYearGaz(groupedData: any, data: any): any {
    const years = Object.keys(groupedData).map(Number).sort();
    const values = years.map(year => groupedData[year].value);

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      labels: years,
      datasets: [
        {
          label: 'Gaz',
          borderRadius: 5,
          data: values,
          backgroundColor: '#00AFCB'
        }
      ],
      plugins: {
        tooltip: {
          enabled: true,
          callbacks: {
            title: (tooltipItem: any) => `Année: ${tooltipItem[0].label}`,
            label: (tooltipItem: any) => {
              const year = parseInt(tooltipItem.label);
              return [
                `Total: ${groupedData[year].value} kWh`
              ];
            }
          },
          backgroundColor: 'rgba(0,0,0,0.7)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: '#FF6C00',
          borderWidth: 2,
          padding: 10,
          caretSize: 5,
          position: 'nearest',
          displayColors: false
        },
        legend: {
          position: 'bottom',
          align: 'end',
          labels: {
            generateLabels: (chart: Chart) => [
              { text: 'LEGENDE :', fillStyle: 'transparent', hidden: false },
              ...Chart.defaults.plugins.legend.labels.generateLabels(chart)
            ],
            boxWidth: 10,
            padding: 15
          }
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: 'black',
          font: { weight: 'bold', size: 13 },
          formatter: (_: any, context: any) => {
            const index = context.dataIndex;
            const value = values[index];
            return value ? `${value} kWh` : '';
          }
        }
      },
      scales: {
        x: {
          stacked: false,
          ticks: { color: 'gray' },
          grid: { display: false },
          barPercentage: 0.5,
          categoryPercentage: 0.6
        },
        y: {
          stacked: false,
          title: {
            display: true,
            text: 'kWh',
            color: 'gray',
            font: { size: 14 }
          },
          ticks: { color: 'gray' },
          grid: { color: '#f3f3f3', drawBorder: false }
        }
      }
    };
  }
}
