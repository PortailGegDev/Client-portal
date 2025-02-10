import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Consumption } from '../../shared/models/consumption.model';

export interface ApiResponseConsumption {
  d: {
    results: Consumption[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ConsumptionHttpService {

  constructor(private http: HttpClient) { }

    // TODO: Asupprimer après avoir finir la consommation 

  Url = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com:443/CataloguePortail_DF1/ZA_MeterReadingDocument?$format=json&$filter=ContractISU";
    // TODO: A décommenter après avoir finir la consommation 
  // Url = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com/CataloguePortail_QF1/ZA_MeterReadingDocument?sap-client={{mandant}}&$format=json&$filter=ContractISU";
  fetchConsumptionData(contractNumber: string): Observable<ApiResponseConsumption> {

    // TODO: Asupprimer après avoir finir la consommation 
    // contractNumber = '0350000261'
    let url = `${this.Url} eq '${contractNumber}'`;

    return this.http.get<ApiResponseConsumption>(url)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la requête:', error);
          return throwError(() => error);
        })
      );
  }
}
