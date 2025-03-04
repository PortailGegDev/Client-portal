import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseHttpService } from './base-http.service';
import { Contract } from '../../shared/models/contract.model';
import { ContractDetails } from '../../shared/models/contract-details.model';


const headers = new HttpHeaders({
  'Authorization': 'Basic ' + btoa('WKHARRAT:sapbtpQF1_Qf144'), // Remplacez par vos informations d'authentification
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ContractHttpService extends BaseHttpService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  fetchContractByBusinessPartner(businessPartner: string): Observable<Contract[]> {
    const url = `${this.apiUrlContractList}/ZA_ContractList?$format=json&$filter=PartnerId eq '${businessPartner}'`;
    
    return this.httpClient.get(url).pipe(
      map((response: any) => response?.d?.results ?? []),
      catchError(error => {
        console.error('errreur lors de la récup', error);
        return of([]);
      })
    );
  }

  fetchContractISU(filter: string | null): Observable<ContractDetails[]> {
    const url = `${this.apiUrl}/ZA_Contract?$format=json&$filter=${filter}`;
    
    return this.httpClient.get(url).pipe(
      map((response: any) => response?.d?.results ?? []),
      catchError(error => {
        console.error('errreur lors de la récup', error);
        return of([]);
      })
    );
  }

  fetchContractPartner(businessPartner: string | null): Observable<any[]> {
    const url = `${this.apiUrl}/ZA_ContractPartner?$format=json&$filter=BusinessPartner eq '${businessPartner}'`;

    return this.httpClient.get(url).pipe(
      map((response: any) => response?.d?.results ?? []),
      catchError(error => {
        console.error('errreur lors de la récup', error);
        return of([]);
      })
    );
  }
}