import { Injectable } from '@angular/core';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { shortFrenchMonth } from '../../../shared/utils/date-utilities';
import { Chart, ScriptableContext } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  initChartConsumptionDataByMonth(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[], gazConsumptions: ChartConsumption[]): any {
    let chartResult: any = {
      labels: shortFrenchMonth,
      datasets: [
        // TODO : Cacher les données méteos : en attendant les informations ou les apis liées
        // A décommenter et à mettre en plcae des données reçu dans "data"
        // {
        //   type: 'line',
        //   label: 'Données météo',
        //   borderColor: 'darkgray',
        //   borderWidth: 2,
        //   spanGaps: true,
        //   autoSkip: false,
        //   fill: false,
        //   tension: 0.4,
        //   data: [1, 5, 12, 17, 12, 30, 35, 30, 25, 17, 12, 3],
        //   yAxisID: 'y1' // Lie la courbe à l'axe `y1`
        // }
      ]
    };

    if (hcConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        label: 'Heures creuses',
        data: [
          hpConsumptions.find(item => item.monthNumber === 1)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 2)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 3)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 4)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 5)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 6)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 7)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 8)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 9)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 10)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 11)?.value ?? 0,
          hpConsumptions.find(item => item.monthNumber === 12)?.value ?? 0,
        ],
        pointStyle: 'rect',
        borderColor: '#0DB58D',
        minBarWidth: 48,
        borderRadius: 8,
        minBarLength: 29,
        backgroundColor: (ctx: ScriptableContext<'bar'>) => {
          // ctx.raw contient la valeur brute de la barre
          return ctx.raw === 0
            ? '#F8F6F5'  // gris léger pour les 0
            : '#0DB58D';
        }
      });
    }

    if (hpConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        label: 'Heures pleines',
        data: [
          hcConsumptions.find(item => item.monthNumber === 1)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 2)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 3)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 4)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 5)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 6)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 7)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 8)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 9)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 10)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 11)?.value ?? 0,
          hcConsumptions.find(item => item.monthNumber === 12)?.value ?? 0,
        ],
        minBarWidth: 48,
        borderRadius: 8,
        borderColor: '#FF6C00',
        minBarLength: 29,
        backgroundColor: (ctx: ScriptableContext<'bar'>) => {
          // ctx.raw contient la valeur brute de la barre
          return ctx.raw === 0
            ? '#F8F6F5'  // gris léger pour les 0
            : '#FF6C00';
        }
      });
    }

    if (gazConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        label: 'Gaz',
        data: [
          gazConsumptions.find(item => item.monthNumber === 1)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 2)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 3)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 4)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 5)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 6)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 7)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 8)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 9)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 10)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 11)?.value ?? 0,
          gazConsumptions.find(item => item.monthNumber === 12)?.value ?? 0,
        ],
        minBarWidth: 48,
        borderRadius: 8,
        borderColor: '#00AFCB',
        minBarLength: 29,
        backgroundColor: (ctx: ScriptableContext<'bar'>) => {
          // ctx.raw contient la valeur brute de la barre
          return ctx.raw === 0
            ? '#F8F6F5'  // gris léger pour les 0
            : '#00AFCB';         // bleu gaz pour les autres

        },
      });
    }

    return chartResult;
  }

  initChartConsumptionDataByYear(groppedConsumptionsByYear: any, electricity: boolean): any {

    // Extraire les années triées
    const years = Object.keys(groppedConsumptionsByYear).map(y => parseInt(y)).sort((a, b) => a - b);

    if (electricity) {
      return {
        labels: years.map(y => y.toString()), // Les labels sont les années
        datasets: [
          {
            type: 'bar',
            label: 'Heures creuses',
            borderColor: '#0DB58D',
            backgroundColor: '#0DB58D',
            data: years.map(y => groppedConsumptionsByYear[y].hp) // Somme des valeurs HP par année
          },
          {
            type: 'bar',
            borderRadius: 8,
            label: 'Heures pleines',
            borderColor: '#FF6C00',
            backgroundColor: '#FF6C00',
            data: years.map(y => groppedConsumptionsByYear[y].hc) // Somme des valeurs HC par année
          }
        ]
      };
    }

    return {
      labels: years.map(y => y.toString()), // Les labels sont les années
      datasets: [
        {
          type: 'bar',
          label: 'Gaz',
          borderRadius: 8,
          borderColor: '#00AFCB',
          backgroundColor: '#00AFCB',
          data: years.map(y => groppedConsumptionsByYear[y].value) // Somme des valeurs HP par année
        }
      ]
    };
  }
}
