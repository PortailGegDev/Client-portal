import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Facture } from '../../shared/models/facture-model';

interface ApiResponse {
  d: {
    results: Facture[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class InvoiceHTTPService {
  constructor(private http: HttpClient) {
    this.currentBrand = localStorage.getItem('currentBrand') || 'GEG'; // Valeur par défaut 'GEG'

  }

  Url = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com/CataloguePortail_QF1/ZA_UtilitiesBillingDocuments";
  fetchFactures(contractId: string | null): Observable<Facture[]> {

    if (!contractId) {
      contractId = '0350103717'
    }

    let url = `${this.Url}?$format=json&amp;$filter=ISUContract eq '${contractId}'`;

    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa('KTRIMECHE:IliadeConsulting@2024')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<{invoices:Facture[]}>(url)
    .pipe(map((response:any) => response.d.results || [] ),
    catchError(error =>{
      console.error('erreur lors de la récupperation de la facture',error);
      return of ([]);
    }
    )
  );
  }

  private currentBrand: string;
  // Méthode pour récupérer la marque actuelle
  getBrand(): string {
    return this.currentBrand;
  }

  // Méthode pour définir une nouvelle marque
  setBrand(brand: string): void {
    this.currentBrand = brand;
    localStorage.setItem('currentBrand', brand);  // Sauvegarder dans le LocalStorage pour persister l'état
  }
}
