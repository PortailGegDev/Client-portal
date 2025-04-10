import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Bank } from '../../shared/models/bank.model';
import { BaseHttpService } from './base-http.service';
import { UpdateRib } from '../../shared/models/update-rib';

@Injectable({
  providedIn: 'root'
})
export class BankHttpService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchCompteBancaire(businessPartner: string | null): Observable<{ banks: Bank[], csrfToken: string }> {
    let url = `${this.apiUrl}/ZA_BusinessPartnerBank?$format=json&$filter=BusinessPartnerId eq '${businessPartner}'`;

    return this.http.get(url, { headers: { 'x-csrf-token': 'fetch' }, observe: 'response' })  // On observe la réponse complète
      .pipe(
        map((response: any) => {
          const banks = response.body?.d.results || [];  // Extraction des données bancaires
          const csrfToken = response.headers.get('X-CSRF-TOKEN') || '';  // Extraction du CSRF token
debugger
          return { banks, csrfToken };  // Retourner les banques et le CSRF token
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des comptes bancaires', error);
          return of({ banks: [], csrfToken: '' });
        })
      );
  }

  createCompteBancaire(updateRib: UpdateRib): Observable<any> {
    let url = `${this.apiUrl}/ZA_BusinessPartnerBank`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Csrf-Token': 'None' });

    return this.http.post(url, updateRib, { headers }).pipe(
      catchError(error => {
        console.error('Erreur lors de la création du compte bancaire', error);
        return throwError(() => error);
      })
    );
  }

}