import { Component, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/http-services/auth.service';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ContractService } from './shared/services/contract.service';
import { Contract } from './shared/models/contract.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'client-portal';
  baseURL = '/sap/opu/odata/SAP/Z001_SRV/FlightSet?$top=2&$format=json'

  contracts: Signal<Contract[]>;
  selectedContract: Signal<Contract | null>;

  constructor(private authService: AuthService,
    private contractService: ContractService
  ) {
    this.authService.logTokenDetails();
    this.contracts = this.contractService.contracts;
    this.selectedContract = this.contractService.selectedContract;
  }

  ngOnInit() {
    this.loadContract();
  }

  loadContract() {
    const bp = this.authService.getUserData()?.bp;

    // Charger les contrats via le service
    this.contractService.getAllBpContracts(bp!).subscribe({
      next: (contracts) => {
        // Les contrats sont déjà mis à jour via les signaux
        console.log('Contrats chargés :', contracts);
      }
    });
  }
}
