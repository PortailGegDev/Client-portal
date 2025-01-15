import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser?: User;

  constructor(private http: HttpClient) { }

  logTokenDetails() {
    this.http.get<any>('/user-api/currentUser').subscribe({
      next: (data) => {
        if (data) {

          this.currentUser = new User(
            data.firstname,
            data.lastname,
            data.email,
            data.name,
            data.scopes,
            data.displayName
          );

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

  getCurrentUser(): User | undefined {
    return this.currentUser;
  }

  logout() {
    this.currentUser = undefined; // Réinitialiser l'utilisateur lors de la déconnexion
  }
}
