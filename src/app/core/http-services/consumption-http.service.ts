import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Consumption } from '../models/consumption.model';

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

  Url = "https://geg-api.test.apimanagement.eu10.hana.ondemand.com:443/CataloguePortail_QF1/ZA_MeterReadingDocument?sap-client={{mandant}}&$format=json&$filter=ContractISU eq '0350000912'";
  fetchConsumptionData(): Observable<ApiResponseConsumption> {

    return this.http.get<ApiResponseConsumption>(this.Url)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la requête:', error);
          return throwError(error);
        })
      );
  }
}
