import { Injectable } from '@angular/core';
import { ConsumptionHttpService } from '../../../core/http-services/consumption-http.service';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { convertSAPDateToTsDate, getMonthFromDate } from '../../../shared/utils/date-utilities';
import { map, Observable } from 'rxjs';


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

            if (!consumption.MeterReadingDate) {
              return;
            }

            let dateConsumption = convertSAPDateToTsDate(consumption.MeterReadingDate);

            if (!dateConsumption) {
              return;
            }

            let value = consumption.Consumption ? parseFloat(consumption.Consumption.toString()) || 0 : 0;


            let chartConsumption: ChartConsumption = {
              date: dateConsumption!,
              monthNumber: getMonthFromDate(dateConsumption!),
              year: dateConsumption!.getFullYear(),
              value: value,
              idSeasonal: consumption.IdSeasonal,
              Energy: consumption.Energy
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
          .map(consumptions => {
            const dateConsumption = convertSAPDateToTsDate(consumptions.MeterReadingDate);

            // Filtrer les consommations invalides directement
            if (!dateConsumption) {
              return null;
            }

            return {
              date: dateConsumption,
              monthNumber: getMonthFromDate(dateConsumption),
              value: consumptions.Consumption || 0,
            } as ChartConsumption;
          })
          .filter((consumption): consumption is ChartConsumption => !!consumption) // Retirer les valeurs null
          .sort((a, b) => b.date.getTime() - a.date.getTime()) // Trier les consommations
          .slice(0, 4); // Garder uniquement les 4 premières données
      })
    );
  }

}
