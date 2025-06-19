import { Injectable } from '@angular/core';
import { ConsumptionHttpService } from '../../../core/http-services/consumption-http.service';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { convertSAPDateToTsDate, getMonthFromDate } from '../../../shared/utils/date-utilities';
import { map, Observable } from 'rxjs';
import { Constants } from '../../../shared/utils/constants';


@Injectable({
  providedIn: 'root'
})
export class ConsumptionService {

  constructor(private consumptionHttpService: ConsumptionHttpService) { }

  getChartConsumptionData(contractISU: string, year: number): Observable<ChartConsumption[]> {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const filter = `and MeterReadingDate ge datetime'${startDate.toISOString().slice(0, 19)}' and MeterReadingDate le datetime'${endDate.toISOString().slice(0, 19)}'`

    return this.consumptionHttpService.fetchConsumptionDataByYear(contractISU, filter)
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
              energy: consumption.Energy
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
        const consumptions = consumptionsData
          .map(consumptions => {
            const dateConsumption = convertSAPDateToTsDate(consumptions.MeterReadingDate);

            // Filtrer les consommations invalides directement
            if (!dateConsumption) {
              return null;
            }

            return {
              date: dateConsumption,
              monthNumber: getMonthFromDate(dateConsumption),
              value: Number(consumptions.Consumption) || 0,
              energy: consumptions.Energy,
              year: consumptions.year,
              idSeasonal: consumptions.IdSeasonal

            } as ChartConsumption;
          })
          .filter((consumption): consumption is ChartConsumption => !!consumption) // Retirer les valeurs null
          .sort((a, b) => b.date.getTime() - a.date.getTime()); // Trier les consommations

        if (consumptions[0]?.energy === Constants.EnergyType.ELECTRICITY) {
          // Fusionner HC et HP par mois+année
          const merged: ChartConsumption[] = [];

          consumptions.forEach(c => {
            const existing = merged.find(
              m => m.year === c.year && m.monthNumber === c.monthNumber
            );

            if (existing) {
              existing.value += c.value;
            } else {
              merged.push({ ...c }); // ajouter une nouvelle entrée (HP ou HC)
            }
          });

          // Trier par date décroissante
          merged.sort((a, b) => b.date.getTime() - a.date.getTime());

          return merged.slice(0, 4);
        }

        return consumptions.slice(0, 4); // Garder uniquement les 4 premières données
      })
    );
  }

}
