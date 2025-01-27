import { Injectable } from '@angular/core';
import { ApiResponseConsumption, ConsumptionHttpService } from '../../../core/http-services/consumption-http.service';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { convertSAPDateToTsDate, getMonthFromDate } from '../../../shared/utils/date-utilities';
import { map, Observable } from 'rxjs';
import moment, { months } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  constructor(private consumptionHttpService: ConsumptionHttpService) { }

  getChartConsumptionData(contractNumber: string): Observable<ChartConsumption[]> {
    return this.consumptionHttpService.fetchConsumptionData(contractNumber)
      .pipe(
        map((response: ApiResponseConsumption) => {
          let chartConsumptions: ChartConsumption[] = [];
          let consumptions = response.d.results;

          consumptions.forEach(consumption => {

            let dateConsumption = convertSAPDateToTsDate(consumption.MeterReadingDate);

            if (!dateConsumption) {
              return;
            }

            let value = consumption.Consumption ? consumption.Consumption : 0;

            let chartConsumption: ChartConsumption = {
              date: dateConsumption,
              monthNumber: getMonthFromDate(dateConsumption),
              value: value
            };

            chartConsumptions.push(chartConsumption);
          });

          // Trier les données par date (du plus récent au plus ancien)
          chartConsumptions = chartConsumptions.sort((a, b) => b.date.getTime() - a.date.getTime());

          return chartConsumptions;
        })
      );
  }

  getLastfourChartConsumptionData(contractNumber: string): Observable<ChartConsumption[]> {
    return this.consumptionHttpService.fetchConsumptionData(contractNumber).pipe(
      map((response: ApiResponseConsumption) => {
        return response.d.results
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
