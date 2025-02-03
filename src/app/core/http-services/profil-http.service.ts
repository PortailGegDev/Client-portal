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

  constructor( private http: HttpClient) { }


    //Profil Client
 Url1 = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com/CataloguePortail_QF1/ZA_SAPAccount?$filter=BusinessPartnerID eq '1510000926'&$format=json";
  fetchPerson(bp: string | null): Observable<Profil[]> {
      // if (!bp) {
      //   bp = '1510060117'; // Valeur par défaut
      // }
  
      // const url = `${this.Url1}?$filter=BusinessPartnerId eq '${bp}'&$format=json`;
  
      return this.http.get<{profils:Profil[]}>(this.Url1)
      .pipe(map((response:any) => response.d.results || [] ),
      catchError(error =>{
        console.error('erreur lors de la récupperation des détails du profil',error);
        return of ([]);
      }
      )
    );
    }
  }