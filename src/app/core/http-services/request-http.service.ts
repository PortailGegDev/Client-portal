import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { RequestRecission } from '../../shared/models/request-rescission.model';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestHttpService extends BaseHttpService {
  apiSalsforceOrigame3: string;
  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    super();
    this.apiSalsforceOrigame3 = environment.apiSalsforceOrigame3;
  }
  
  createRequestRescission(dataBody:RequestRecission):Observable<any>{
    const Url = `${this.apiSalsforceOrigame3}/resiliation`;
    return this.http.post<any>('Url',dataBody).pipe
    (map((response: any) => response.attributes[0] || []),
      catchError(error => {
        console.error(`erreur lors d'envoie de demande`, error);
        return of(undefined);
      })
    );
  }
}