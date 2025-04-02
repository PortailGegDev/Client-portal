import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Mandate } from '../../shared/models/mandate.model';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class MandateHttpService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchMandate(filter: string | null): Observable<Mandate[]> {
    let url = `${this.apiUrl}/ZA_SEPAMandate?$format=json&$filter=${filter}`;

    return this.http.get<{ mandate: Mandate | undefined }>(url)
      .pipe(map((response: any) => response.d.results),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of([]);
        })
      );
  }
}