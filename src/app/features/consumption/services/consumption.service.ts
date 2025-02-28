import { Injectable } from '@angular/core';
import { ConsumptionHttpService } from '../../../core/http-services/consumption-http.service';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { convertSAPDateToTsDate, getMonthFromDate } from '../../../shared/utils/date-utilities';
import { map, Observable } from 'rxjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  constructor(private consumptionHttpService: ConsumptionHttpService) { }

  getChartConsumptionData(contractNumber: string): Observable<ChartConsumption[]> {
    return this.consumptionHttpService.fetchConsumptionData(contractNumber)
      .pipe(
        map((consumptionsData: any[]) => {
          let chartConsumptions: ChartConsumption[] = [];
          let consumptions = consumptionsData;

          consumptions.forEach(consumption => {

            if (!consumption.EndIndexDate) {
              return;
            }

            let dateConsumption = convertSAPDateToTsDate(consumption.EndIndexDate);

            if (!dateConsumption) {
              return;
            }

            let value = consumption.Consumption ? parseFloat(consumption.Consumption.toString()) || 0 : 0;


            let chartConsumption: ChartConsumption = {
              date: dateConsumption!,
              monthNumber: getMonthFromDate(dateConsumption!),
              year: dateConsumption!.getFullYear(),
              value: value,
              idSeasonal: consumption.IdSeasonal
            };

            chartConsumptions.push(chartConsumption);
          });


          // TODO: A Supprimer 
          chartConsumptions.push({
            date: new Date("11/11/2024"),
            monthNumber: 12,
            year: 2024,
            value: 200,
            idSeasonal: 'HP'
          });

          chartConsumptions.push({
            date: new Date("11/11/10120241"),
            monthNumber: 12,
            year: 2024,
            value: 134,
            idSeasonal: 'HC'
          });

          chartConsumptions.push({
            date: new Date("11/11/2024"),
            monthNumber: 9,
            year: 2024,
            value: 123,
            idSeasonal: 'HP'
          });

          chartConsumptions.push({
            date: new Date("11/11/2024"),
            monthNumber: 9,
            year: 2024,
            value: 130,
            idSeasonal: 'HC'
          });

          chartConsumptions.push({
            date: new Date("11/11/2024"),
            monthNumber: 8,
            year: 2024,
            value: 120,
            idSeasonal: 'HP'
          });

          chartConsumptions.push({
            date: new Date("11/11/2024"),
            monthNumber: 8,
            year: 2024,
            value: 90,
            idSeasonal: 'HC'
          });

          chartConsumptions.push({
            date: new Date("11/11/2024"),
            monthNumber: 12,
            year: 2024,
            value: 200,
            idSeasonal: 'HP'
          });

          chartConsumptions.push({
            date: new Date("11/11/2023"),
            monthNumber: 12,
            year: 2023,
            value: 200,
            idSeasonal: 'HP'
          });

          chartConsumptions.push({
            date: new Date("11/11/2023"),
            monthNumber: 12,
            year: 2023,
            value: 200,
            idSeasonal: 'Hc'
          });

          chartConsumptions.push({
            date: new Date("11/11/2023"),
            monthNumber: 12,
            year: 2023,
            value: 200,
            idSeasonal: 'HP'
          });

          // Trier les données par date (du plus récent au plus ancien)
          chartConsumptions = chartConsumptions.sort((a, b) => b.date.getTime() - a.date.getTime());

          return chartConsumptions;
        })
      );
  }

  getLastfourChartConsumptionData(contractNumber: string): Observable<ChartConsumption[]> {
    return this.consumptionHttpService.fetchConsumptionData(contractNumber).pipe(
      map((consumptionsData: any[]) => {
        return consumptionsData
          .map(consumption => {
            const dateConsumption = convertSAPDateToTsDate(consumption.MeterReadingDate);

            // Filtrer les consommations invalides directement
            if (!dateConsumption) {
              return null;
            }

            return {
              date: dateConsumption,
              monthNumber: getMonthFromDate(dateConsumption),
              value: consumption.Consumption || 0,
            } as ChartConsumption;
          })
          .filter((consumption): consumption is ChartConsumption => !!consumption) // Retirer les valeurs null
          .sort((a, b) => b.date.getTime() - a.date.getTime()) // Trier les consommations
          .slice(0, 4); // Garder uniquement les 4 premières données
      })
    );
  }

}
