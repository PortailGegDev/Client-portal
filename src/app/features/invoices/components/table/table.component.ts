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
import { InvoicesService } from '../../services/invoices.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices-table',
  imports: [CommonModule, TimeSpanToDatePipe, FormsModule, Message, ButtonModule, TableModule, TagModule, ConfirmDialogModule, InputIconModule, IconFieldModule, ToastModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [MessageService]
})
export class AppInvoicesTableComponent implements OnChanges {
  @Input() invoices: Invoice[] = [];
  @Input() inputvalue: string = '';
  @ViewChild('dt') dt: Table | undefined;

  selectedInvoices: Invoice[] = [];

  constructor(private invoiceService: InvoicesService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnChanges(): void {
    if (this.invoices.length > 0) {
      console.log(this.invoices);
    }

    if (this.inputvalue) {
      this.filterGlobal(this.inputvalue)
    }
  }

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

  payInvoice(invoice: Invoice) {
   
    this.router.navigate(['invoices', 'paypage', 'orderId', 547534343436473, 'amount', 2000]);
  }

  deselectAllInvoices() {
    this.selectedInvoices = [];
  }

  downloadInvoiceDoc(invoiceNumber: string) {
    this.invoiceService.downloadInvoiceByInvoiceNumber(invoiceNumber).subscribe({
      next: (downloadUrl: any) => {
        if (downloadUrl) {
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.target = '_blank';
          a.download = `Facture numéro ${invoiceNumber}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          console.error("Aucune URL de téléchargement trouvée.");
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Oups !', detail: err });
      }
    });
  }
}
