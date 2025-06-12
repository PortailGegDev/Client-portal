import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
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
import { DatePipe } from '@angular/common';
import { ChartOptionsService } from '../../../consumption/services/chart-options.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-home-consumption',
  imports: [PanelModule, ChartModule, TimeSpanToDatePipe, ButtonModule, DatePipe],
  templateUrl: './consumption.component.html',
  styleUrl: './consumption.component.scss'
})
export class AppHomeConsumptionComponent implements OnInit, OnChanges, OnDestroy {
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
    private chartOptionsService: ChartOptionsService,
    private invoiceService: InvoicesService) {

    this.chartOptionsService.chartOptions$.subscribe((options: any) => {
      if (this.consumptions) {
        this.basicOptions = null;
        this.basicOptions = options;

      }
    });

  }

  ngOnInit() {
    // Enregistrer le plugin avant d'initialiser le graphique
    Chart.register(ChartDataLabels);
  }

  ngOnChanges() {
    if (this.consumptions) {
      this.getChartDataAndOptions(this.consumptions);
    }
  }

  ngOnDestroy() {
    this.basicOptions = null;
    this.chartOptionsService.resetChartOptions();
  }

  private getChartDataAndOptions(consumptions: ChartConsumption[]) {

    this.basicData = {
      labels: consumptions.map(item => item.monthNumber ? getMonthNameByMonthNumber(item.monthNumber) : ''),
      datasets: [
        {
          label: 'Consommation',
          data: consumptions.map(item => item.value || 0),
          backgroundColor: [
            'rgba(255, 108, 0, 0.10)',
            'rgba(255, 108, 0, 0.10',
            'rgba(255, 108, 0, 0.20)',
            'rgba(255, 108, 0, 0.30)'],
          borderWidth: 0,
        },
      ],
    };

    this.chartOptionsService.initHomeChartConsumption(consumptions);
  }

  navigateToConsumption() {
    this.router.navigate(["/consumption"]);
  }
}
