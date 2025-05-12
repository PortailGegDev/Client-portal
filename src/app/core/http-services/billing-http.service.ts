import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BillingHttpService extends BaseHttpService {
    // private baseUrl = 'https://geg-api.test.apimanagement.eu10.hana.ondemand.com/Api_PortailClientQF1';

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    super();
  }

  fetchPaymentSchedule(contractISU: string | null): Observable<any> {
    let url = `${this.apiUrlContractList}/ZA_BIllingPlanH?$format=json&$filter=ContractISU  eq '${contractISU}'&$format=json&$select=BillingPlanID`;

    return this.http.get(url)
      .pipe(
        map((response: any) => {
            const billingPlanID = response?.d?.results[0]?.BillingPlanID || null;
            return billingPlanID;
          }),
        catchError(error => {
          console.error('Erreur lors de la récupération du BillingPlanID', error);
          return of([]);
        })
      );
  }

  fetchBillingPlanDetails(billingPlanID: string): Observable<any> {
    const url = `${this.apiUrlContractList}/ZA_BIllingPlanItem?$format=json&$filter=BillingPlanID eq '${billingPlanID}'`;
  
    return this.http.get(url).pipe(
      map((response: any) => response?.d?.results || []),
      catchError(error => {
        console.error('Erreur lors de la récupération des détails du plan', error);
        return of([]);
      })
    );
  }
  
}