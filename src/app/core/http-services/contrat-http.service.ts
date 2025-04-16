import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseHttpService } from './base-http.service';
import { Contract } from '../../shared/models/contract/contract.model';
import { ContractDetails } from '../../shared/models/contract/contract-details.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { ContractUpdate } from '../../shared/models/contract/contract-update.model';

@Injectable({
  providedIn: 'root'
})
export class ContractHttpService extends BaseHttpService {

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    super();
  }

  fetchContractByBusinessPartner(businessPartner: string): Observable<Contract[]> {

    const url = `${this.apiUrlContractList}/ZA_ContractList?$format=json&$filter=PartnerId eq '${businessPartner}'`;

    return this.http.get(url).pipe(
      map((response: any) => response?.d?.results ?? []),
      catchError(error => {
        console.error('errreur lors de la récup', error);
        return of([]);
      })
    );
  }

  fetchContractISU(filter: string | null): Observable<ContractDetails[]> {
    const url = `${this.apiUrl}/ZA_Contract?$format=json&$filter=${filter}`;

    return this.http.get(url).pipe(
      map((response: any) => response?.d?.results ?? []),
      catchError(error => {
        console.error('errreur lors de la récup', error);
        return of([]);
      })
    );
  }

  fetchContractPartner(businessPartner: string | null): Observable<any[]> {
    const url = `${this.apiUrl}/ZA_ContractPartner?$format=json&$filter=BusinessPartner eq '${businessPartner}'`;

    return this.http.get(url).pipe(
      map((response: any) => response?.d?.results ?? []),
      catchError(error => {
        console.error('errreur lors de la récup', error);
        return of([]);
      })
    );
  }

  updateContractDetails(contractUpdate: ContractUpdate): Observable<any> {

    const url = `${this.apiUrl}/ZA_Contract('${contractUpdate.ContractISU}')`;
    const csrfToken = this.localStorageService.getItem('csrfToken');
    console.log('Contenu du body envoyé :', contractUpdate);

    return this.http.put(url, contractUpdate, {
      headers: new HttpHeaders({ 'X-Csrf-Token': csrfToken })
    }).pipe(
      map((response: any) => {
        const contracts = response?.d || null;
        return contracts as Contract;
      }),

      catchError(error => {
        console.error('Erreur lors de la création du compte bancaire', error);
        return of(null);

      })
    );
  }
}