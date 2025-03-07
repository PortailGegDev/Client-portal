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

  contracts: Signal<Contract[]>;
  selectedContract: Signal<Contract | null>;
  haveContract: boolean | undefined = undefined;

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
    let businessPartner = this.authService.getUserData()?.bp;

    if (!businessPartner) {
      // pour tester en locale dans la DF1
      // businessPartner = '1510060117'; // bp consommation pour QF1
      // businessPartner = '1510023652'; // bp liste de contrats pour DF1
      // businessPartner = '1510063413'; // bp liste de contrats pour QF1
      // businessPartner='1510031862'; // bp liste de contrats pour partenaire
      // businessPartner='350000261'; //bp DF1
    }
    businessPartner = '1510136444'; 
    // Charger les contrats via le service
    this.contractService.getContractByBusinessPartner(businessPartner!).subscribe({
      next: (contracts) => {
        this.haveContract = contracts.length > 0;
        // Les contrats sont déjà mis à jour via les signaux
        console.log('Contrats chargés :', contracts);
      }
    });
  }
}