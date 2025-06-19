import { Injectable } from '@angular/core';
import { InvoiceHTTPService } from '../../../core/http-services/invoice-http.service';
import { Observable } from 'rxjs';
import { Invoice } from '../../../shared/models/invoice-model';
import { addDays, convertSAPDateToTsDate } from '../../../shared/utils/date-utilities';
import { Contract } from '../../../shared/models/contract/contract.model';
import { ContractDetails } from '../../../shared/models/contract/contract-details.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private invoicesHTTPservice: InvoiceHTTPService) { }

  getInvoiceByUtilitiesInvoicingDocument(utilitiesInvoicingDocument: string | null): Observable<Invoice[]> {
    return this.invoicesHTTPservice.fetchFacturesByUtilitiesInvoicingDocument(utilitiesInvoicingDocument);
  }

  getInvoices(contractISU: string | null): Observable<Invoice[]> {
    return this.invoicesHTTPservice.fetchFactures(contractISU);
  }

  filterInvoicesByDates(contractISU: string | null, startDate: Date, endDate: Date) {
    const filter = `and PostingDate ge datetime'${startDate.toISOString().slice(0, 19)}' and PostingDate le datetime'${endDate.toISOString().slice(0, 19)}'`
        return this.invoicesHTTPservice.fetchFactures(contractISU, filter);
  }

  downloadInvoiceByInvoiceNumber(invoiceNumber: string) {
    return this.invoicesHTTPservice.downloadInvoiceByInvoiceNumber(invoiceNumber);
  }

  getInvoicePaymentTermCustomer(selectedContract: Contract | ContractDetails, invoice: Invoice): Date | null {
    const postingDate = convertSAPDateToTsDate(invoice.PostingDate);

    if (!postingDate) {
      console.warn(`Pas de PostingDate liée à la facutre numéro ${invoice.UtilitiesInvoicingDocument}`);
      return null;
    }

    const index = selectedContract!.PaymentTerms.indexOf("z+");
    const dayNumber = selectedContract!.PaymentTerms.substring(index + 2);

    return addDays(postingDate, Number(dayNumber))
  }
}
