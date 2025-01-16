import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser?: User;

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

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

          this.localStorageService.setItem('user', this.currentUser);
          this.currentUserSubject.next(this.currentUser);

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

    this.http.get<any>('/user-api/userinfo ').subscribe({
      next: (data) => {
        console.log(data);
        if (data) {

        }
      },
      error: (err) => {
        console.error('Failed to fetch token:', err);
      }
    });

    this.http.get<any>('/user-api/session ').subscribe({
      next: (data) => {
        console.log(data);
        if (data) {

        }
      },
      error: (err) => {
        console.error('Failed to fetch token:', err);
      }
    });
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
