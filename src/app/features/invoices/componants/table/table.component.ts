import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Facture } from '../../../../shared/models/facture-model';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { convertSAPDate } from '../../../../shared/utils/date-utilities';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';

@Component({
  selector: 'app-invoices-table',
  imports: [CommonModule,TimeSpanToDatePipe,FormsModule,ButtonModule,TableModule,TagModule,ConfirmDialogModule,InputIconModule,IconFieldModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class AppInvoicesTableComponent implements OnChanges {
@Input() invoices:Facture[]=[];
ngOnChanges(changes: SimpleChanges): void {
  if (this.invoices.length >0)
  {
    console.log(this.invoices);
  }
}
selectedInvoices:Facture[]=[];
  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warn';
        case 'OUTOFSTOCK':
            return 'danger';
    }
    return undefined;
  }
  
  filterGlobal(event: Event, dt: Table) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt.filterGlobal(inputValue, 'contains');
  }
  payFacture(facture: Facture) {
  }
}
