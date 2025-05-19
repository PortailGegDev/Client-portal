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
import { AbsolutePipe } from '../../../../shared/pipe/absolute.pipe';
import { Message } from 'primeng/message';
import { InvoicesService } from '../../services/invoices.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { addDays, convertSAPDateToTsDate } from '../../../../shared/utils/date-utilities';
import { Constants } from '../../../../shared/utils/constants';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-invoices-table',
  imports: [CommonModule, TimeSpanToDatePipe, TooltipModule, FormsModule, Message, ButtonModule, TableModule, TagModule, ConfirmDialogModule, InputIconModule, IconFieldModule, ToastModule, AbsolutePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [MessageService]
})
export class AppInvoicesTableComponent implements OnChanges {
  @Input() invoices: Invoice[] = [];
  @Input() inputvalue: string = '';
  @Input() selectedContract: Contract | null = null;

  @ViewChild('dt') dt: Table | undefined;

  selectedInvoices: Invoice[] = [];

  get isPaymentMethodP(): boolean {
    return this.selectedContract?.PaymentMethod === Constants.PaymentMethod.P;
  }

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

    if (invoice.StatusInvoicingDocument === Constants.InvoiceStatus.SOLDEE) {
      return;
    }

    this.router.navigate(['invoices', 'paypage', 'orderId', invoice.UtilitiesInvoicingDocument, 'amount', invoice.TotalUnpaidTTC.toString().replace('.', '')]);
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

  getInvoiceStatus(invoice: Invoice): string {
    if (this.isAvenir(invoice)) {
      return Constants.InvoiceStatus.A_VENIR;
    }

    if (this.isPartiellementSoldee(invoice) || this.isNonSoldee(invoice)) {
      return Constants.InvoiceStatus.A_REGLER;
    }

    if (this.isTotalementSoldee(invoice)) {
      return Constants.InvoiceStatus.REGLEE;
    }

    return '';
  }

  isPartiellementSoldee(invoice: Invoice): boolean {
    return invoice.StatusInvoicingDocument === Constants.InvoiceStatus.PARTIELLEMENT_SOLDEE
  }

  isTotalementSoldee(invoice: Invoice): boolean {
    return invoice.StatusInvoicingDocument === Constants.InvoiceStatus.SOLDEE
  }

  isNonSoldee(invoice: Invoice): boolean {
    return invoice.StatusInvoicingDocument === Constants.InvoiceStatus.NON_SOLDEE
  }

  isAvenir(invoice: Invoice): boolean {
    if (this.isNonSoldee(invoice) && invoice.NetDueDate && this.isPaymentMethodP) {
      return convertSAPDateToTsDate(invoice.NetDueDate)! > new Date();
    }

    return false;
  }

  showPaymentButton(invoice: Invoice): boolean {
    if (invoice.PaymentMethod === Constants.PaymentMethod.P) {
      return false;
    }

    if (this.isNonSoldee(invoice) || this.isPartiellementSoldee(invoice)) {
      return true;
    }
    return false;
  }

  getPaymentTermCustomer(invoice: Invoice): Date | null {
    const postingDate = convertSAPDateToTsDate(invoice.PostingDate);

    if (!postingDate) {
      console.warn(`Pas de PostingDate liée à la facutre numéro ${invoice.UtilitiesInvoicingDocument}`);
      return null;
    }
    // TODO : tester l'appelle de méthode concernant l'ajout d'un nombre de jours selectedContract.PaymentTerms au PostingDate

    const index = this.selectedContract!.PaymentTerms.indexOf("z+");
    const dayNumber = this.selectedContract!.PaymentTerms.substring(index + 2);


    return addDays(postingDate, Number(dayNumber))
  }
}
