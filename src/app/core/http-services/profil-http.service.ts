import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Profil } from '../../shared/models/profil.model';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilHttpService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchPerson(bp: string | null): Observable<Profil | undefined> {
    let url = `${this.apiUrl}/ZA_SAPAccount?$format=json&$filter=BusinessPartnerId eq '${bp}'`;

    return this.http.get<{ profil: Profil | undefined }>(url)
      .pipe(map((response: any) => response.d.results[0] || []),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of(undefined);
        })
      );
  }

  fetchPersonByFilter(filter: string | null): Observable<Profil[]> {
    let url = `${this.apiUrl}/ZA_SAPAccount?$format=json&$filter=${filter}`;

    return this.http.get<{ profil: Profil[] }>(url)
      .pipe(map((response: any) => response.d.results),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of([]);
        })
      );
  }
}