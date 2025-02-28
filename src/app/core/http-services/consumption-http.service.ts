import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Consumption } from '../../shared/models/consumption.model';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionHttpService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchConsumptionData(contractNumber: string): Observable<any[]> {

    let url = `${this.apiUrl}/ZA_MeterReadingDocument?$format=json&$filter=ContractISU eq '${contractNumber}'`;

    return this.http.get<any[]>(url)
      .pipe(
        map((response: any) => response.d.results || []),
        catchError(error => {
          console.error('erreur lors de la récupperation de données de consommation', error);
          return of([]);
        })
      );
  }
}
