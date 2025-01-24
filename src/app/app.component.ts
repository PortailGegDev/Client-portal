import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/http-services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'client-portal';
  baseURL = '/sap/opu/odata/SAP/Z001_SRV/FlightSet?$top=2&$format=json'

  constructor(private authService: AuthService,) {
    this.authService.logTokenDetails();
   }
 
}
