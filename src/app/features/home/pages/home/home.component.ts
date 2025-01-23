import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../shared/services/brand.service';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { ConsumptionService } from '../../../consumption/services/consumption.service';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../shared/services/contract.service';
import { AppHomeCarouselComponent } from '../../components/carousel/carousel.component';
import { Facture } from '../../../../shared/models/facture-model';
import { AppHomeDocumentsComponent } from '../../components/documents/documents.component';
import { AppHomeConsumptionComponent } from '../../components/consumption/consumption.component';
import { ArticlesComponent } from '../../../../shared/components/articles/articles.component';
import { HeadlineComponent } from '../../../../shared/components/headline/headline.component';
import { InvoicesService } from '../../../../shared/services/invoices.service';

@Component({
  selector: 'app-home',
  imports: [AppHomeCarouselComponent, AppHomeDocumentsComponent, AppHomeConsumptionComponent, ActiveContractComponent, ArticlesComponent, HeadlineComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class AppHomeComponent {
  selectedContract: any = null;
  theme: string = "";
  currentUser?: User;
  carouselData: any[] = [];
  lastInvoice: Facture | null = null;
  consumptions: ChartConsumption[] = [];

  constructor(
    private contractService: ContractService,
    private invoicesService: InvoicesService,
    private consumptionService: ConsumptionService,
    private brandService: BrandService,
    private authService: AuthService
  ) {

    this.contractService.contract$.subscribe((data) => {
      this.loadConsumption(data.ContractISU);
      this.loadLastInvoice(data.ContractISU);
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getUserData();
    this.theme = this.brandService.getBrand();
  }

  loadLastInvoice(contractId: string): void {
    this.invoicesService.getInvoices(contractId).subscribe({
      next: (invoices: Facture[]) => {
      
        // Trier par date décroissante pour trouver la dernière facture
        const sortedInvoices = invoices.sort(
          (a, b) =>
            new Date(b.postingDate).getTime() -
            new Date(a.postingDate).getTime()
        );

        // Prendre la première facture après tri
        this.lastInvoice = sortedInvoices[0];
      },
      error: (error) => {
        console.error("Erreur lors du chargement des factures:", error);
      },
    });
  }

  loadConsumption(contractNumber: string) {
    contractNumber = '0350103717';
    this.consumptionService.getChartConsumptionData(contractNumber).subscribe({
      next: (consumptions) => {
        this.consumptions = consumptions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Tri descendant
          .slice(0, 4);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des données de consommation:", error);
      },
    });
  }

  // loadConsumptionChart(consumptions: any[]) {
  //   const ctx = document.getElementById(
  //     "consumptionChart"
  //   ) as HTMLCanvasElement;
  //   if (ctx) {
  //     new Chart(ctx, {
  //       type: "bar",
  //       plugins: [ChartDataLabels],
  //       data: {
  //         labels: [
  //           `${getMonthNameByMonthNumber(consumptions[3].monthNumber)} (kWh)`,
  //           `${getMonthNameByMonthNumber(consumptions[2].monthNumber)} (kWh)`,
  //           `${getMonthNameByMonthNumber(consumptions[1].monthNumber)} (kWh)`,
  //           `${getMonthNameByMonthNumber(consumptions[0].monthNumber)} (kWh)`
  //         ],
  //         datasets: [
  //           {
  //             data: [consumptions[3].value, consumptions[2].value, consumptions[1].value, consumptions[0].value],
  //             backgroundColor: [
  //               'rgba(255, 108, 0, 0.10)',
  //               'rgba(255, 108, 0, 0.10',
  //               'rgba(255, 108, 0, 0.20)',
  //               'rgba(255, 108, 0, 0.30)'],
  //             categoryPercentage: 0.97, // l'espace entre les barres
  //           },
  //         ],
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false, // Permet de maintenir le ratio d'aspect
  //         plugins: {
  //           legend: {
  //             display: false,
  //           },
  //           datalabels: {
  //             color: "black",
  //             display: true,
  //             align: "center",
  //             anchor: "center",
  //             font: {
  //               size: 14,
  //               weight: "bold",
  //             },
  //             formatter: (value, context) => {
  //               // const month = context.chart.data.labels ? context.chart.data.labels[context.dataIndex] : null;
  //               // return `${value} kWh\n${month}`;
  //             },
  //           },
  //         },
  //         scales: {
  //           x: {
  //             display: true,
  //           },
  //           y: {
  //             display: false,
  //           },
  //         },
  //         layout: {
  //           padding: {
  //             left: 0,
  //             right: 0,
  //             top: 0,
  //             bottom: 0,
  //           },
  //         },
  //       },
  //     });
  //   } else {
  //     console.error("consumptionChart element not found");
  //   }
  // }
}
