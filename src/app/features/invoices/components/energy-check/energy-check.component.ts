import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { Invoice } from '../../../../shared/models/invoice-model';

@Component({
  selector: 'app-invoices-energy-check',
  imports: [ButtonModule,TableModule,TimeSpanToDatePipe],
  templateUrl: './energy-check.component.html',
  styleUrl: './energy-check.component.scss'
})
export class AppInvoicesEnergyCheckComponent {
  @Input() invoices: Invoice[] = [];
  @ViewChild('dt') dt: Table | undefined;
  invoicesData:  { statut: string; dateprelevemnt:string; DateDemission:string; TotalAmountHT: string; date: string | null } | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.invoices.length > 0) {
      console.log(this.invoices);
    }
  }
}
