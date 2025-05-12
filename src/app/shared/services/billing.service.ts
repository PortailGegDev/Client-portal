import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BillingHttpService } from '../../core/http-services/billing-http.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(private billinghttpService: BillingHttpService) { }

  getPaymentSchedule(contractISU: string): Observable<any> {
    return this.billinghttpService.fetchPaymentSchedule(contractISU);
  }

  getBillingPlanDetails(billingPlanID: string): Observable<any[]>{
    return this.billinghttpService.fetchBillingPlanDetails(billingPlanID);
  }

}