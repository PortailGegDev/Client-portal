import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Invoice } from '../../../../shared/models/invoice-model';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { Message } from 'primeng/message';


@Component({
  selector: 'app-invoices-table',
  imports: [CommonModule, TimeSpanToDatePipe, FormsModule, Message, ButtonModule, TableModule, TagModule, ConfirmDialogModule, InputIconModule, IconFieldModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class AppInvoicesTableComponent implements OnChanges {
  @Input() invoices: Invoice[] = [];
  @Input() inputvalue: string = '';
  @ViewChild('dt') dt: Table | undefined;

  ngOnChanges(): void {
    if (this.invoices.length > 0) {
      console.log(this.invoices);
    }

    if (this.inputvalue) {
      this.filterGlobal(this.inputvalue)
    }
  }

  selectedInvoices: Invoice[] = [];
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

  filterGlobal(inputValue: string) {
    this.dt?.filterGlobal(inputValue, 'contains');
  }
  payFacture(facture: Invoice) {
  }

  deselectAllInvoices() {
    this.selectedInvoices = [];
  }
}
