import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumptionHttpService extends BaseHttpService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchConsumptionData(contractISU: string): Observable<any[]> {

    let url = `${this.apiUrl}/ZA_MeterReadingDocument?$filter=ContractISU eq '${contractISU}'&$orderby=MeterReadingDate desc`;

    return this.http.get<any[]>(url)
      .pipe(
        map((response: any) => response.d.results || []),
        catchError(error => {
          console.error('erreur lors de la récupperation de données de consommation', error);
          return of([]);
        })
      );
  }

  fetchConsumptionDataByYear(contractISU: string, filter:string): Observable<any[]> {

    let url = `${this.apiUrl}/ZA_MeterReadingDocument?$filter=ContractISU eq '${contractISU}' ${filter ? filter : ''}&$orderby=MeterReadingDate desc`;

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
