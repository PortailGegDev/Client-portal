import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Invoice } from '../../shared/models/invoice-model';
import { BaseHttpService } from './base-http.service';
import { environment } from '../../../environments/environment.prod';
import { UndoIcon } from 'primeng/icons';

@Injectable({
  providedIn: 'root'
})
export class InvoiceHTTPService extends BaseHttpService {

  apiSP: string;

  constructor(private http: HttpClient) {
    super();
    this.apiSP = environment.apiSP;
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
    let url = `${this.apiUrl}/ZA_UtilitiesBillingDocuments?$filter=ISUContract eq '${contractISU}' ${filter ? filter : ''}&$orderby=PostingDate desc&$top=12`;

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
    let url = `${this.apiSP}/${invoiceNumber}`;

    return this.http.post<any>(url, {}).pipe(
      map(response => response.value?.[0]?.["@microsoft.graph.downloadUrl"]),
      catchError(error => {

        console.error('Erreur lors de la récupération du lien de téléchargement', error);
        return throwError(() => new Error('Impossible de récupérer le fichier.'));
      })
    );
  }
}
