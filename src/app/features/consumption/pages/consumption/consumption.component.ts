import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadlineComponent } from '../../../../shared/components/headline/headline.component';
import { ArticlesComponent } from '../../../../shared/components/articles/articles.component';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../shared/services/contract.service';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { ConsumptionService } from '../../services/consumption.service';
import { AppConsumptionChartComponent } from '../../components/chart/chart.component';
import { Contract } from '../../../../shared/models/contract/contract.model';

@Component({
  selector: 'app-consumption',
  imports: [CommonModule, HeadlineComponent, ArticlesComponent, ActiveContractComponent, AppConsumptionChartComponent],
  templateUrl: './consumption.component.html',
  styleUrl: './consumption.component.scss'
})
export class AppConsumptionComponent {

  selectedContract: Contract | null = null;
  consumptions = signal<ChartConsumption[] | null>(null);


  constructor(private consumptionService: ConsumptionService,
    private contractService: ContractService) {
    effect(() => {
      const selectedContract = this.contractService.selectedContract();

      if (selectedContract) {
        this.loadConsumption(selectedContract.ContractISU);
      }
    });
  }

  loadConsumption(contractISU: string) {
    this.consumptionService.getChartConsumptionData(contractISU).subscribe({
      next: (consumptions) => {


          consumptions?.push({
            Energy: "01", date: new Date('2025-06-24'), idSeasonal: 'HP', monthNumber: 6, value: 180, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-02-24'), idSeasonal: 'HP', monthNumber: 2, value: 200, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-03-24'), idSeasonal: 'HP', monthNumber: 3, value: 198, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-04-24T01:00:00+0100'), idSeasonal: 'HP', monthNumber: 4, value: 165, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-05-24T01:00:00+0100'), idSeasonal: 'HP', monthNumber: 5, value: 320, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-06-24T01:00:00+0100'), idSeasonal: 'HC', monthNumber: 6, value: 200, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-02-24T01:00:00+0100'), idSeasonal: 'HC', monthNumber: 2, value: 63, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-03-24T01:00:00+0100'), idSeasonal: 'HC', monthNumber: 3, value: 120, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-04-24T01:00:00+0100'), idSeasonal: 'HC', monthNumber: 4, value: 88, year: 2025
          });

          consumptions?.push({
            Energy: "01", date: new Date('2025-05-24T01:00:00+0100'), idSeasonal: 'HC', monthNumber: 5, value: 90, year: 2025
          });


          consumptions?.push({
            Energy: "02", date: new Date('2025-06-24T01:00:00+0100'), idSeasonal: 'CONSO_GAZ', monthNumber: 6, value: 180, year: 2025
          });

          consumptions?.push({
            Energy: "02", date: new Date('2025-02-24T01:00:00+0100'), idSeasonal: 'CONSO_GAZ', monthNumber: 2, value: 200, year: 2025
          });

          consumptions?.push({
            Energy: "02", date: new Date('2025-03-24T01:00:00+0100'), idSeasonal: 'CONSO_GAZ', monthNumber: 1, value: 198, year: 2025
          });

          consumptions?.push({
            Energy: "02", date: new Date('2025-04-24T01:00:00+0100'), idSeasonal: 'CONSO_GAZ', monthNumber: 4, value: 165, year: 2025
          });

          consumptions?.push({
            Energy: "02", date: new Date('2025-05-24T01:00:00+0100'), idSeasonal: 'CONSO_GAZ', monthNumber: 5, value: 320, year: 2025
          });


        this.consumptions.set(consumptions);

      },
      error: (error) => {
        console.error("Erreur lors du chargement des données de consommation:", error);
      },
    });
  }
}
