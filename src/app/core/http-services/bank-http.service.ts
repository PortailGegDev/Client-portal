import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Bank } from '../../shared/models/bank.model';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class BankHttpService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchCompteBancaire(businessPartner: string | null): Observable<Bank[]> {
    let url = `${this.apiUrl}/ZA_BusinessPartnerBank?$format=json&$filter=BusinessPartnerId eq '${businessPartner}'`;

    return this.http.get<{ bank: Bank[] | undefined }>(url)
      .pipe(map((response: any) => response.d.results || []),
        catchError(error => {
          console.error('erreur lors de la récupération des comptes bancaire', error);
          return of([]);
        })
      );
  }

  createCompteBancaire(body: any): Observable<any> {
    let url = `${this.apiUrl}/ZA_BusinessPartnerBank`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post(url, body, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du compte bancaire', error);
        return throwError(() => error);
      })
    );
  }
  
}