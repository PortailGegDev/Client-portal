import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';


interface ContactClass {
  __deferred: {
    uri: string;
  };
}
interface ContactAction {
  __metadata: {
    id: string;
    uri: string;
    type: string;
  };
  ContactClassID: string;
  ContactActionID: string;
  Description: string;
  ContactClass: ContactClass;
}

interface ApiResponse {
  d: {
    results: ContactAction[];
  };
}

const headers = new HttpHeaders({
  'Authorization': 'Basic ' + btoa('WKHARRAT:sapbtpQF1_Qf144'), // Remplacez par vos informations d'authentification
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class ContractHttpService {
  /* private apiUrl = 'https://service.sap.com/sap/opu/odata/sap/ERP_ISU_UMC/ContractAccounts'; */
  private apiUrl = 'https://vhgrgQF1ci.sap.geg.fr:44300/sap/opu/odata/sap/ERP_ISU_UMC/Channels';

  constructor(private http: HttpClient, private httpClient: HttpClient) { }

  /* getContracts(accountId: string): Observable<any> {

    const url = `${this.apiUrl}('${accountId}')/SalesContracts`;
    
    return this.http.get<any>(url);
  } */

  getContracts(): Observable<any> {

    const url = `${this.apiUrl}`;
    return this.http.get<any>(url, { headers });
  }


  Url2 = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com/ZAPI_SAP_SF_V2_QF1/ZA_UtilitiesBillingDocuments('101000000001')?$format=json";
  fetchContract(): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa('KTRIMECHE:IliadeConsulting@2024')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<ApiResponse>(this.Url2)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la requête:', error);
          return throwError(error);
        })
      );
  }

  //Profil Client
  Url1 = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com/CataloguePortail_QF1/ZA_SAPAccount?$filter=BusinessPartnerID eq '1510000926'&$format=json";
  fetchPerson(): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa('KTRIMECHE:IliadeConsulting@2024')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<ApiResponse>(this.Url1)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la requête:', error);
          return throwError(error);
        })
      );
  }

  Url = 'https://geg-api.test.apimanagement.eu10.hana.ondemand.com/ZAPI_SAP_SF_V2_QF1/ZA_Contract/$count';
  fetchContractData(): Observable<string> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization': `Basic ${btoa('KTRIMECHE:IliadeConsulting@2024')}`,
      'Content-Type': 'application/atom+xml;type=feed;charset=utf-8'
    });

    return this.httpClient.request('GET', this.Url, {
      responseType: 'text'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching data:', error);
        return throwError(() => error);
      })
    );
  }


  Url3 = `https://geg-api.test.apimanagement.eu10.hana.ondemand.com/CataloguePortail_QF1/ZA_Contract`;
  fetchContractISU(bp: string | null): Observable<any> {

    if (!bp) {
      bp = '1510000926';
    }

    const url = `${this.Url3}?$format=json&$filter=BusinessPartnerId eq '${bp}'`;
    // Create headers for the request
    const headers = new HttpHeaders({
      'Accept': 'application/json',  // Expecting JSON response
      'Accept-Language': 'fr',      // Language header
      'Authorization': `Basic ${btoa('KTRIMECHE:IliadeConsulting@2024')}`,  // Basic Auth (base64 encoded)
      'Content-Type': 'application/json',  // Request body format
      'X-Requested-With': 'XMLHttpRequest',  // To help with CORS
    });

    // Making the GET request
    return this.httpClient.get(url).pipe(
      tap((response) => {
        console.log('Données récupérées avec succès :', response);  // Log successful data retrieval
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de la récupération des données :', error);
        return throwError(() => error);  // Return the error to be handled by the caller
      })
    );
  }




}