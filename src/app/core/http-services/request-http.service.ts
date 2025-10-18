import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { RequestRecission } from '../../shared/models/request-rescission.model';
import { environment } from '../../../environments/environment.prod';
import { RequestReclamation } from '../../shared/models/request-reclamation.model';
import { RequestRead } from '../../shared/models/request-rescission-read.model';

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
    let url = `${this.apiSalsforceOrigame3}/resiliation`;
    return this.http.post<any>(url, dataBody).pipe
    (map((response: any) => response.attributes[0] || []),
      catchError(error => {
        console.error(`erreur lors d'envoie de demande`, error);
        return of(undefined);
      })
    );
  }

  getRescissionRequest(contactId: string): Observable<RequestRead[]> {
    const url = `${this.apiSalsforceOrigame3}/resiliation-requests-list?contactId=${contactId}`;
    return this.http.get<RequestRead[]>(url).pipe(
      catchError(err => {
        console.error('Erreur API:', err);
        return of([]); // retourne un tableau vide en cas d'erreur
      })
    );
  
  }

    createRequestReclamation(dataBody:RequestReclamation):Observable<any>{
    let url = `${this.apiSalsforceOrigame3}/reclamations`;
    return this.http.post<any>(url, dataBody).pipe
    (map((response: any) => response.attributes[0] || []),
      catchError(error => {
        console.error(`erreur lors d'envoie de demande`, error);
        return of(undefined);
      })
    );
  }
  
  getReclamationRequest(contactId: string): Observable<RequestRead[]> {
    const url = `${this.apiSalsforceOrigame3}/reclamations-list?contactId=${contactId}`;
    return this.http.get<RequestRead[]>(url).pipe(
      catchError(err => {
        console.error('Erreur API:', err);
        return of([]); // retourne un tableau vide en cas d'erreur
      })
    );
  
  }
  
}