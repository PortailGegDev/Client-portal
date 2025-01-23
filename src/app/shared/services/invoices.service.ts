import { Injectable } from '@angular/core';
import { InvoiceHTTPService } from '../../core/http-services/invoice-http.service';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture-model';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor( private invoicesHTTPservice: InvoiceHTTPService) { }

  getInvoices(contractId: string | null):Observable<Facture[]>{
    return this.invoicesHTTPservice.fetchFactures(contractId);
  }
}
