import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentHttpService } from '../../../core/http-services/payment-http.service';
import { PaymentRedirection } from '../../../shared/models/payment-redirection.model';
import { PaymentData } from '../../../shared/models/payment-data.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private paymentHttpService: PaymentHttpService) { }

  initiatePayment(paymentData: PaymentData): Observable<PaymentRedirection | undefined> {
    return this.paymentHttpService.initiatePayment(paymentData);
  }
}
