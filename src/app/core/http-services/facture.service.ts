import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export interface Facture {
  PostingDate: string;
  UtilitiesInvoicingDocument: string;
  TotalAmount: string;
  StatusInvoicingDocument: string;
}
interface ApiResponse {
  d: {
    results: Facture[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class FactureService {
  constructor(private http: HttpClient) { 
    this.currentBrand = localStorage.getItem('currentBrand') || 'GEG'; // Valeur par défaut 'GEG'

  }

  Url ="https://geg-api.test.apimanagement.eu10.hana.ondemand.com/CataloguePortail_QF1/ZA_UtilitiesBillingDocuments?$format=json&amp;$filter=ISUContract eq 350000007";
  fetchFactures():Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa('KTRIMECHE:IliadeConsulting@2024')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<ApiResponse>(this.Url)
    .pipe(
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        return throwError(error);
      })
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
