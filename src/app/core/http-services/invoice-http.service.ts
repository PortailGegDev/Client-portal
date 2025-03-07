import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Facture } from '../../shared/models/facture-model';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceHTTPService extends BaseHttpService {
  
  constructor(private http: HttpClient) {
    super();
  }

  fetchFactures(contractISU: string | null): Observable<Facture[]> {
    // if (!contractISU) {
    //   contractISU = '0350153099';
    // }

    let url = `${this.apiUrl}/ZA_UtilitiesBillingDocuments?$filter=ISUContract eq '${contractISU}'`;


    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa('KTRIMECHE:IliadeConsulting@2024')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.get<{ invoices: Facture[] }>(url)
      .pipe(map((response: any) => response.d.results || []),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of([]);
        }
        )
      );
  }
}
