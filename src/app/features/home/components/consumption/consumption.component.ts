import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Invoice } from '../../../../shared/models/invoice-model';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { getMonthNameByMonthNumber } from '../../../../shared/utils/date-utilities';
import { Router } from '@angular/router';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { ButtonModule } from 'primeng/button';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { Constants } from '../../../../shared/utils/constants';
import { InvoicesService } from '../../../invoices/services/invoices.service';
import { AbsolutePipe } from '../../../../shared/pipe/absolute.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-consumption',
  imports: [PanelModule, ChartModule, TimeSpanToDatePipe, ButtonModule, DatePipe],
  templateUrl: './consumption.component.html',
  styleUrl: './consumption.component.scss'
})
export class AppHomeConsumptionComponent implements OnChanges, OnDestroy {
  @Input() invoices: Invoice[] = [];
  @Input() consumptions: ChartConsumption[] | null = null;
  @Input() contractDetails: ContractDetails | null = null;

  hasNoInvoice: boolean = false;

  basicData: any = null;
  basicOptions: any = null;

  get paymentModeLabel(): string {
    let label = `Paiement ${this.contractDetails?.PaymentMethod === Constants.PaymentMethod.P ? 'par ' : 'sans'} prélèvement `;

    if (this.contractDetails?.PaymentProcedure === Constants.PaymentProcedure.BIM) {
      label += 'bimestriel';
    }

    if (this.contractDetails?.PaymentProcedure === Constants.PaymentProcedure.ECH || this.contractDetails?.PaymentProcedure === Constants.PaymentProcedure.MEN) {
      label += 'mensuel';
    }

    return label;
  }

  get lastUnpaidInvoice(): Invoice | null {
    return this.invoices.filter(item => item.StatusInvoicingDocument !== Constants.InvoiceStatus.SOLDEE)[0] || null;
  }

  // get isInvoiceTotalementSoldee(): boolean {
  //   return (this.lastUnpaidInvoice && this.lastUnpaidInvoice.StatusInvoicingDocument === Constants.InvoiceStatus.SOLDEE) || false;
  // }

  get isPaymentMethodP(): boolean {
    return this.contractDetails?.PaymentMethod === Constants.PaymentMethod.P
  }

  get paymentTermDate(): Date | null {
    if (!this.contractDetails || this.invoices.length === 0) {
      return null;
    }

    return this.invoiceService.getInvoicePaymentTermCustomer(this.contractDetails, this.invoices[0]);
  }

  constructor(private router: Router,
    private invoiceService: InvoicesService,
    private cd: ChangeDetectorRef) { }

  ngOnChanges() {
    // Nettoyage des anciennes données
    this.basicData = null;
    this.basicOptions = null;
    this.cd.detectChanges();

    if (this.consumptions) {
      this.getChartDataAndOptions(this.consumptions);
    }
  }

  ngOnDestroy() {
    // Nettoyage au moment de la destruction du composant
    this.basicData = null;
    this.basicOptions = null;
    this.cd.detectChanges();
  }

  private getChartDataAndOptions(consumptions: ChartConsumption[]) {
    this.basicData = {
      labels: [
        `${getMonthNameByMonthNumber(consumptions[3]?.monthNumber)
        } (kWh)`,
        `${getMonthNameByMonthNumber(consumptions[2]?.monthNumber)} (kWh)`,
        `${getMonthNameByMonthNumber(consumptions[1]?.monthNumber)} (kWh)`,
        `${getMonthNameByMonthNumber(consumptions[0]?.monthNumber)} (kWh)`
      ],
      datasets: [
        {
          label: 'Consommation',
          data: [consumptions[3]?.value, consumptions[2]?.value, consumptions[1]?.value, consumptions[0]?.value],
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
            return `${value} kWh\n${month} `;
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

    // Forcer l’actualisation de l’UI
    this.cd.detectChanges();
  }

  navigateToConsumption() {
    this.router.navigate(["/consumption"]);
  }
}
