import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Mandate } from '../../shared/models/mandate.model';
import { BaseHttpService } from './base-http.service';
import { CreateMandat } from '../../shared/models/create-mandat.model';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MandateHttpService extends BaseHttpService {

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    super();
  }

  fetchMandate(filter: string | null): Observable<Mandate[]> {
    let url = `${this.apiUrl}/ZA_SEPAMandate?$format=json&$filter=${filter}`;
    return this.http.get(url, { headers: { 'x-csrf-token': 'fetch' }, observe: 'response' })
      .pipe(
        map((response: any) => {

          const mandates = response.body?.d.results || [];
          const csrfToken = response.headers.get('X-CSRF-TOKEN') || '';
          this.localStorageService.setItem('csrfToken', csrfToken);

          return mandates as Mandate[];
        }),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of([]);
        })
      );
  }

  createMandat(createMandat: CreateMandat): Observable<Mandate | null> {
    let url = `${this.apiUrl}/ZA_SEPAMandate`;

    const csrfToken = this.localStorageService.getItem('csrfToken');
    console.log('Contenu du body envoyé :', createMandat);
    return this.http.post<Mandate>(url, createMandat, {
      headers: new HttpHeaders({ 'X-Csrf-Token': csrfToken })
    })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la création du compte bancaire', error);
          return of(null);
        })
      );
  }


}