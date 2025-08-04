import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { PaymentRedirection } from '../../shared/models/payment-redirection.model';
import { PaymentData } from '../../shared/models/payment-data.model';
import { environment } from '../../../environments/environment.prod';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentHttpService extends BaseHttpService {

  private paymentUrl = '';
  constructor(private http: HttpClient) { 
    super();
    this.paymentUrl = environment.apiPayment;
  }

  initiatePayment(paymentData: PaymentData): Observable<PaymentRedirection | undefined> {
    return this.http.post<PaymentRedirection>(`${this.paymentUrl}/initiate`, paymentData)
      .pipe(
        map((response: PaymentRedirection) => response || undefined),
        catchError(error => {
          console.error('erreur lors de la récupperation du lien de paiement en ligne', error);
          return of(undefined);
        })
      );
  }

  checkPaymentResult(invoiceNumber:string): Observable<string | undefined> {
    return this.http.get<string>(`${this.paymentUrl}/check-result/$filter=UtilitiesInvoicingDocument eq '${invoiceNumber}'`)
      .pipe(
        map((status: string) => status || undefined),
        catchError(error => {
          console.error('erreur lors de paiement en ligne', error);
          return of(undefined);
        })
      );
  }

  getProductSupplier(contractISU: string): Observable<string | undefined> {
    const url = `${this.apiUrl}/ZA_Contract?$filter=ContractISU eq '${contractISU}'`;
  
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const results = response?.d?.results;
        if (Array.isArray(results) && results.length > 0) {
          return results[0].ProductSupplier;
        }
        return undefined;
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération du ProductSupplier :', error);
        return of(undefined);
      })
    );
  }
  
}