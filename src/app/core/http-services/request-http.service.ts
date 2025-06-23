import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { RequestRecission } from '../../shared/models/request-rescission.model';

@Injectable({
  providedIn: 'root'
})
export class RequestHttpService extends BaseHttpService {

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService) {
    super();
  }
  
  createRequestRescission(dataBody:RequestRecission):Observable<any>{
    const Url = '';
    return this.http.post<any>('Url',dataBody).pipe
    (map((response: any) => response.attributes[0] || []),
      catchError(error => {
        console.error(`erreur lors d'envoie de demande`, error);
        return of(undefined);
      })
    );
  }
}