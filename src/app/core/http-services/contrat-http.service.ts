import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BaseHttpService } from './base-http.service';


const headers = new HttpHeaders({
  'Authorization': 'Basic ' + btoa('WKHARRAT:sapbtpQF1_Qf144'), // Remplacez par vos informations d'authentification
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ContractHttpService extends BaseHttpService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  private getHeaders(): HttpHeaders {
    // Ajoutez les en-têtes nécessaires ici
    return new HttpHeaders({
      'Authorization': 'Basic ' + btoa('KTRIMECHE:IliadeConsulting@2024'), // Remplacez par vos informations d'authentification
      'Content-Type': 'application/json'
    });
  }

  fetchContractISU(filter: string | null): Observable<any> {

    const url = `${this.apiUrl}/ZA_Contract?$format=json&$filter=${filter}`;
    
    return this.httpClient.get(url).pipe(
      map((response: any) => response?.d?.results ?? []),
      catchError(error => {
        console.error('errreur lors de la récup', error);
        return of([]);
      })
    );
  }

  fetchContractPartner(businessPartner: string | null): Observable<any[]> {

    if (!businessPartner) {
      //bp = '1510060117'; // bp consommation pour QF1
      //businessPartner = '1510023652'; // bp liste de contrats pour QF1
      businessPartner = '1510063413'; // bp liste de contrats pour QF1
      // businessPartner='1510031862'; // bp liste de contrats pour partenaire
    }

    const url = `${this.apiUrl}/ZA_ContractPartner?$format=json&$filter=BusinessPartner eq '${businessPartner}'`;

    return this.httpClient.get(url).pipe(
      map((response: any) => response?.d?.results ?? []),
      catchError(error => {
        console.error('errreur lors de la récup', error);
        return of([]);
      })
    );
  }
}