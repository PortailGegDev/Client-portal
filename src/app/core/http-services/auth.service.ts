import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../../shared/models/user.model';
import { catchError, Observable, throwError } from 'rxjs';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: User;
  private currentUserSignal = signal<User | null>(null);
  currentUSer = computed(() => this.currentUserSignal());
  businessPartner = signal<string | null>(null);

  private apiAuthUser: string;

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { this.apiAuthUser = environment.apiAuthUser; }

  logTokenDetails() {
    this.http.get<any>('/user-api/currentUser').subscribe({
      next: (data) => {
        if (data) {

          this.user = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            name: data.name,
            scopes: data.scopes,
            displayName: data.displayName
          };

          this.localStorageService.setItem('user', this.user);
          this.currentUserSignal.set(this.user ?? null);

          // récupération de pb
          this.getUserBp(this.user.email).subscribe({
            next: (jsonUserDataResponse: any) => {
              const resource = jsonUserDataResponse.Resources[0];

              this.user!.bp = resource["urn:ietf:params:scim:schemas:extension:sap:2.0:User"]?.userUuid;

              if (this.user!.bp === null || this.user!.bp === undefined || this.user!.bp === '') {
                console.error('Business partner introuvable !');
                return;
              }

              this.localStorageService.updateItem('user', this.user);
              this.currentUserSignal.set(this.user ?? null);
              this.businessPartner.set(this.user!.bp ?? null);

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
            console.error('No token found in the response:', this.user);
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
    let url = `${this.apiAuthUser}/Users?filter=emails.value eq "${email}"`;

    return this.http.get<any>(url)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la requête:', error);
          return throwError(() => new Error('Erreur lors de la requête:', error));
        })
      );
  }

  logout() {
    this.localStorageService.clear();
    this.currentUserSignal.set(null);
  window.location.href = '/logout';
  }

  getUserData(): User {
    return this.localStorageService.getItem('user');
  }
}
