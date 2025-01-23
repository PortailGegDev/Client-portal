import { Component, Input, OnChanges } from '@angular/core';
import { Facture } from '../../../../shared/models/facture-model';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { convertSAPDate, getMonthNameByMonthNumber } from '../../../../shared/utils/date-utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-consumption',
  imports: [PanelModule, ChartModule],
  templateUrl: './consumption.component.html',
  styleUrl: './consumption.component.scss'
})
export class AppHomeConsumptionComponent implements OnChanges {
  @Input() lastInvoice: Facture | null = null;
  @Input() consumptions: ChartConsumption[] = [];

  basicData: any;
  basicOptions: any;
  lastInvoiceData: { statut: string; TotalAmountHT: string; date: string | null } | null = null;

  constructor(private router: Router) { }

  ngOnChanges() {
    if (this.consumptions) {
      this.getChartDataAndOptions(this.consumptions);
    }

    if (this.lastInvoice) {
      this.lastInvoiceData = {
        statut:
          this.lastInvoice!.statusInvoicingDocument === "Non Soldée"
            ? "A payer"
            : this.lastInvoice!.statusInvoicingDocument === "Totalement Soldée"
              ? "payer"
              : "Autre statut",
        date: convertSAPDate(this.lastInvoice!.postingDate),
        TotalAmountHT: this.lastInvoice!.totalAmount
      };
      console.log("Dernière facture:", this.lastInvoice); // Vérification dans la console

    }
  }

  private getChartDataAndOptions(consumptions: ChartConsumption[]) {
    this.basicData = {
      labels: [
        `${getMonthNameByMonthNumber(consumptions[3].monthNumber)} (kWh)`,
        `${getMonthNameByMonthNumber(consumptions[2].monthNumber)} (kWh)`,
        `${getMonthNameByMonthNumber(consumptions[1].monthNumber)} (kWh)`,
        `${getMonthNameByMonthNumber(consumptions[0].monthNumber)} (kWh)`
      ],
      datasets: [
        {
          label: 'Consommation',
          data: [consumptions[3].value, consumptions[2].value, consumptions[1].value, consumptions[0].value],
          backgroundColor: [
            'rgba(255, 108, 0, 0.10)',
            'rgba(255, 108, 0, 0.10',
            'rgba(255, 108, 0, 0.20)',
            'rgba(255, 108, 0, 0.30)'],
          borderWidth: 0,
        },
      ],
    };

    this.basicOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Masquer la légende
        },
        tooltip: {
          enabled: true, // Activer l'affichage des tooltips
        },
        datalabels: {
          color: "black",
          display: true,
          align: "center",
          anchor: "center",
          font: {
            size: 14,
            weight: "bold",
          },
          formatter: (value: any, context: any) => {
            const month = context.chart.data.labels ? context.chart.data.labels[context.dataIndex] : null;
            return `${value} kWh\n${month}`;
          },
        },
      },
      scales: {
        x: {
          display: true, // Masquer l'axe X si nécessaire
          grid: {
            display: false, // Enlever le quadrillage de l'axe Y
          },
        },
        y: {
          display: false, // Masquer l'axe Y si nécessaire
          grid: {
            display: false, // Enlever le quadrillage de l'axe Y
          },
        },
      },
      layout: {
        padding: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
      },
    };
  }

  navigateToConsumption() {
    this.router.navigate(["/consumption"]);
  }
}
