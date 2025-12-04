import { Injectable } from '@angular/core';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { shortFrenchMonth } from '../../../shared/utils/date-utilities';
import { Chart, ScriptableContext } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  initChartConsumptionDataByMonth(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[], baseConsumptions: ChartConsumption[], gazConsumptions: ChartConsumption[]): any {
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

    // Construire un tableau monthHasConsumption[0..11] = true s'il existe au moins une valeur > 0 pour ce mois
    const monthHasConsumption: boolean[] = Array(12).fill(false);
    const allArrays = [hpConsumptions, hcConsumptions, baseConsumptions, gazConsumptions];

    for (let m = 1; m <= 12; m++) {
      for (const arr of allArrays) {
        const v = arr.find(item => item.monthNumber === m)?.value ?? 0;
        if (v > 0) {
          monthHasConsumption[m - 1] = true;
          break;
        }
      }
    }

    // helper : retourne la valeur ou null selon la règle (null => pas de barre)
    const valueOrNull = (arr: ChartConsumption[], month: number) => {
      const v = arr.find(item => item.monthNumber === month)?.value ?? 0;
      // Si la valeur est 0 ET qu'il existe au moins une consommation pour ce mois, cacher (null)
      return (v === 0 && monthHasConsumption[month - 1]) ? null : v;
    };


    if (baseConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        label: 'Base',
        data: Array.from({ length: 12 }, (_, i) => valueOrNull(baseConsumptions, i + 1)),
        pointStyle: 'rect',
        borderColor: '#93a8e6ff',
        minBarWidth: 48,
        minBarLength: 29,
        borderRadius: 8,
        backgroundColor: (ctx: ScriptableContext<'bar'>) => {
          return ctx.raw === 0 ? '#F8F6F5' : '#93a8e6ff';
        }
      });
    }

    if (hcConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        label: 'Heures creuses',
        data: Array.from({ length: 12 }, (_, i) => valueOrNull(hcConsumptions, i + 1)),
        pointStyle: 'rect',
        borderColor: '#0DB58D',
        minBarWidth: 48,
        borderRadius: 8,
        minBarLength: 29,
        backgroundColor: (ctx: ScriptableContext<'bar'>) => {
          return ctx.raw === 0 ? '#F8F6F5' : '#0DB58D';
        }
      });
    }

    if (hpConsumptions.length > 0) {
      chartResult.datasets.push({
        type: 'bar',
        label: 'Heures pleines',
        data: Array.from({ length: 12 }, (_, i) => valueOrNull(hpConsumptions, i + 1)),
        minBarWidth: 48,
        borderRadius: 8,
        borderColor: '#FF6C00',
        minBarLength: 29,
        backgroundColor: (ctx: ScriptableContext<'bar'>) => {
          return ctx.raw === 0 ? '#F8F6F5' : '#FF6C00';
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
          return (!ctx || ctx.raw === 0)
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
