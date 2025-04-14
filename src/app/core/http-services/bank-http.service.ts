import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Bank } from '../../shared/models/bank.model';
import { BaseHttpService } from './base-http.service';
import { UpdateRib } from '../../shared/models/update-rib';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BankHttpService extends BaseHttpService {

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    super();
  }

  fetchCompteBancaire(businessPartner: string | null): Observable<Bank[]> {
    let url = `${this.apiUrl}/ZA_BusinessPartnerBank?$format=json&$filter=BusinessPartnerId eq '${businessPartner}'`;

    return this.http.get(url, { headers: { 'x-csrf-token': 'fetch' }, observe: 'response' })
      .pipe(
        map((response: any) => {
          const banks = response.body?.d.results || [];
          const csrfToken = response.headers.get('X-CSRF-TOKEN') || '';
          this.localStorageService.setItem('csrfToken', csrfToken);
          return banks as Bank[];
        }),
        catchError(error => {
          console.error('Erreur lors de la récupération des comptes bancaires', error);
          return of([]);
        })
      );
  }

  createCompteBancaire(updateRib: UpdateRib): Observable<Bank | null> {
    let url = `${this.apiUrl}/ZA_BusinessPartnerBank`;

    const csrfToken = this.localStorageService.getItem('csrfToken');
    console.log('Contenu du body envoyé :', updateRib);
    return this.http.post(url, updateRib, {
      headers: new HttpHeaders({ 'X-Csrf-Token': csrfToken })
    }).pipe(
      map((response: any) => {
        const banks = response.body?.d || null;
        return banks as Bank;
      }),

      catchError(error => {
        console.error('Erreur lors de la création du compte bancaire', error);
        return of(null);

      })
    );
  }
}