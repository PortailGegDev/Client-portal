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

  getChartConsumptionData(contractISU: string): Observable<ChartConsumption[]> {
    return this.consumptionHttpService.fetchConsumptionData(contractISU)
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

          chartConsumptions = chartConsumptions.sort((a, b) => b.date.getTime() - a.date.getTime());

          return chartConsumptions;
        })
      );
  }

  getLastfourChartConsumptionData(contractISU: string): Observable<ChartConsumption[]> {
    return this.consumptionHttpService.fetchConsumptionData(contractISU).pipe(
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
