import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Profil } from '../../shared/models/profil.model';
interface ApiResponse {
  d: {
    results: Profil[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class ProfilHttpService {

  constructor(private http: HttpClient) { }
  //Profil Client
  Url1 = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com/CataloguePortail_QF1/ZA_SAPAccount";
  fetchPerson(bp: string | null): Observable<Profil | undefined> {
    if (!bp) {
      bp = '1510060117'; // Valeur par défaut
    }

    let url = `${this.Url1}?$format=json&$filter=BusinessPartnerID eq '${bp}'`;

    return this.http.get<{ profil: Profil | undefined }>(url)
      .pipe(map((response: any) => response.d.results[0] || []),
        catchError(error => {
          console.error('erreur lors de la récupperation de la facture', error);
          return of(undefined);
        })
      );
  }
}