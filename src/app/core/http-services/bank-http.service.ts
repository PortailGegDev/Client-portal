import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Bank } from '../../shared/models/bank.model';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class BankHttpService extends BaseHttpService {

  constructor(private http: HttpClient) { 
    super();
  }

  fetchCompteBancaire(bpBank: string | null): Observable<Bank | undefined> {
    if (!bpBank) {
      bpBank = '15200091280003'; // Valeur par défaut
    }

    let url = `${this.apiUrl}/ZA_BusinessPartnerBank?$format=json&$filter=BusinessPartnerBankId eq '${bpBank}'`;
debugger
    return this.http.get<{ bank: Bank | undefined }>(url)
      .pipe(map((response: any) => response.d.results[0] || []),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of(undefined);
        })
      );
  }
}