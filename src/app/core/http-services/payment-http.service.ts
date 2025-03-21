import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { PaymentRedirection } from '../../shared/models/payment-redirection.model';
import { PaymentData } from '../../shared/models/payment-data.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PaymentHttpService {

  private paymentUrl = '';

  constructor(private http: HttpClient) { 
    this.paymentUrl = environment.apiPayment;
  }
  initiatePayment(paymentData: PaymentData): Observable<PaymentRedirection | undefined> {
    return this.http.post<PaymentRedirection>(`${this.paymentUrl}`, paymentData)
      .pipe(
        map((response: PaymentRedirection) => response || undefined),
        catchError(error => {
          console.error('erreur lors de la récupperation du lien de payement en ligne', error);
          return of(undefined);
        })
      );
  }
}
