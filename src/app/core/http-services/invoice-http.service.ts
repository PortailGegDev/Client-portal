import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Invoice } from '../../shared/models/invoice-model';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InvoiceHTTPService extends BaseHttpService {

  apiSP: string;
  apiSPM: string;

  constructor(private http: HttpClient) {
    super();
    this.apiSP = environment.apiSP;
    this.apiSPM = environment.apiSPM;
  }

  fetchFacturesByUtilitiesInvoicingDocument(utilitiesInvoicingDocument: string | null): Observable<Invoice[]> {
    let url = `${this.apiUrl}/ZA_UtilitiesBillingDocuments?$filter=UtilitiesInvoicingDocument eq '${utilitiesInvoicingDocument}'`;

    return this.http.get<{ invoices: Invoice[] }>(url)
      .pipe(map((response: any) => response.d.results || []),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of([]);
        }));
  }

  fetchFactures(contractISU: string | null, filter: string | null = null): Observable<Invoice[]> {
    let url = `${this.apiUrl}/ZA_UtilitiesBillingDocuments?$filter=ISUContract eq '${contractISU}' ${filter ? filter : ''}&$orderby=PostingDate desc&$top=24`;

    return this.http.get<{ invoices: Invoice[] }>(url)
      .pipe(map((response: any) => response.d.results || []),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of([]);
        }
        )
      );
  }

  downloadInvoiceByInvoiceNumber(invoiceNumber: string): Observable<any> {
    console.log('Invoice number:', invoiceNumber);
    let url = `${this.apiSP}/${invoiceNumber}`;
    return this.http.post<any>(url, {}).pipe(
      map(response => response.value?.["@microsoft.graph.downloadUrl"]),
      catchError(error => {
        console.error('Erreur lors de la récupération du lien de téléchargement', error);
        return throwError(() => new Error('Impossible de récupérer le fichier.'));
      })
    );
  }

   // Télécharger plusieurs factures sous forme de ZIP
 downloadInvoicesAsZip(invoiceNumbers: string[]): Observable<Blob> {
  console.log('Factures à télécharger :', invoiceNumbers);

  // Étape 1 : récupérer le CSRF token
  return this.http.get(this.apiSPM, {
    headers: new HttpHeaders({ 'X-Csrf-Token': 'Fetch' }),
    observe: 'response' 
  }).pipe(
    switchMap(response => {
      const csrfToken = response.headers.get('x-csrf-token');
      if (!csrfToken) {
        return throwError(() => new Error('Impossible de récupérer le CSRF token.'));
      }
      return this.http.post(this.apiSPM, { invoices: invoiceNumbers }, {
        headers: new HttpHeaders({ 'X-Csrf-Token': csrfToken }),
        responseType: 'blob'
      });
    }),
    catchError(error => {
      console.error('Erreur lors du téléchargement des factures en ZIP', error);
      return throwError(() => new Error('Impossible de télécharger les factures.'));
    })
  );
}
}