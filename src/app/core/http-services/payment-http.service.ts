import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { PaymentRedirection } from '../../shared/models/payment-redirection.model';
import { PaymentData } from '../../shared/models/payment-data.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentHttpService {

  private paymentUrl = '';

  constructor(private http: HttpClient) { }

  initiatePayment(paymentData: PaymentData): Observable<PaymentRedirection | undefined> {
    return this.http.post<PaymentRedirection>(`${this.paymentUrl}/initiate-payment`, paymentData)
      .pipe(
        map((response: PaymentRedirection) => response || []),
        catchError(error => {
          console.error('erreur lors de la récupperation du lien de payement en ligne', error);
          return of(undefined);
        })
      );
  }
}
