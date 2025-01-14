import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

export interface Flight {
  Carrid: string;
  Connid: string;
  Fldate: string;
  Price: string;
  Currency: string;
  Planetype: string;
  Seatsmax: number;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-portal';
  baseURL = '/sap/opu/odata/SAP/Z001_SRV/FlightSet?$top=2&$format=json'

  constructor(private http: HttpClient) { }

  callServer() {
    this.http.get<Flight>(this.baseURL).subscribe(data => {
      console.log(data)
    });
  }

  logTokenDetails() {
    this.http.get<any>('/user-api/currentUser').subscribe({
      next: (data) => {
        if (data) {
          // Check if the token exists in the response
          const token = data.token || data.accessToken; // Adjust key if different
          debugger
          if (token) {
            console.log('Token:', token);

            // Decode the token for debugging
            const decodedToken = jwtDecode<any>(token);
            console.log('Decoded Token:', decodedToken);
          } else {
            console.error('No token found in the response:', data);
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
}
