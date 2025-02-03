import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilHttpService {

  constructor( private http: HttpClient) { }


    //Profil Client
    Url1 = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com/CataloguePortail_QF1/ZA_SAPAccount";
    fetchPerson(bp: string | null): Observable<any> {
      if (!bp) {
        bp = '1510060117'; // Valeur par défaut
      }
  
      const url = `${this.Url1}?$format=json&$filter=BusinessPartnerId eq '${bp}'`;
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Accept-Language': 'fr',
        'Authorization': `Basic ${btoa('KTRIMECHE:IliadeConsulting@2024')}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      });
  
      return this.http.get(url, { headers }).pipe(
        tap((response) => {
          console.log('Données récupérées avec succès :', response);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération des données :', error);
          return throwError(() => error);
        })
      );
    }
}
