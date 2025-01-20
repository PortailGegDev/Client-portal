import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
import { BehaviorSubject, catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  currentUser?: User;

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  logTokenDetails() {
    this.http.get<any>('/user-api/currentUser').subscribe({
      next: (data) => {
        if (data) {

          this.currentUser = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            name: data.name,
            scopes: data.scopes,
            displayName: data.displayName
          };

          // récupération de pb
          this.getUserBp(this.currentUser.email).subscribe({
            next: (jsonUserDataResponse: any) => {
              const resource = jsonUserDataResponse.Resources[0];

              this.currentUser!.bp = resource["urn:ietf:params:scim:schemas:extension:sap:2.0:User"].userUuid;
              this.currentUser!.organization = resource["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].organization;

              this.localStorageService.setItem('user', this.currentUser);
              this.currentUserSubject.next(this.currentUser!);
            }
            , error: (error) => {
              console.error('Failed to fetch token:', error);
            }
          });

          // Check if the token exists in the response
          const token = data.token || data.accessToken; // Adjust key if different

          if (token) {
            console.log('Token:', token);

            // Decode the token for debugging
            const decodedToken = jwtDecode<any>(token);
            console.log('Decoded Token:', decodedToken);
          } else {
            console.error('No token found in the response:', this.currentUser);
          }
        } else {
          console.error('Empty response from /user-api/currentUser');
        }
      },
      error: (err) => {
        console.error('Failed to fetch token:', err);
      }
    });
  }



  getUserBp(email: string): Observable<any> {
    let url = `https://geg-api.test.apimanagement.eu10.hana.ondemand.com/IdDS_SCIM/Users?filter=emails.value eq "${email}"`;

    return this.http.get<any>(url)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la requête:', error);
          return throwError(error);
        })
      );
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  logout() {
    this.localStorageService.clear();
    this.currentUserSubject.next(null);
  }

  getUserData(): User {
    return this.localStorageService.getItem('user');
  }
}
