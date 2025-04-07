import { Component, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/http-services/auth.service';
import { ContractService } from './shared/services/contract.service';
import { Contract } from './shared/models/contract.model';
import { environment } from '../environments/environment';
import { PrimeNgLocaleService } from './shared/services/prime-ng-locale.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  compteBancaire: any;
  mandate: any;
  bpBankId: string[] = [];

  contracts: Signal<Contract[]>;
  selectedContract: Signal<Contract | null>;
  haveContract: boolean | undefined = undefined;

  constructor(private authService: AuthService,
    private contractService: ContractService,
    private primeNgLocaleService: PrimeNgLocaleService
  ) {
    this.authService.logTokenDetails();
    this.contracts = this.contractService.contracts;
    this.selectedContract = this.contractService.selectedContract;
    this.primeNgLocaleService.applyFrenchLocale();
  }

  ngOnInit() {
    this.loadContract();
  }

  loadContract() {
    let businessPartner = this.authService.getUserData()?.bp;

    if (environment.local === true) {
      // pour tester en locale dans la DF1
      businessPartner = '1510136444';
      // businessPartner = '1510060117'; // bp consommation pour QF1
      // businessPartner = '1510023652'; // bp liste de contrats pour DF1
      // businessPartner = '1510063413'; // bp liste de contrats pour QF1
      // businessPartner='1510031862'; // bp liste de contrats pour partenaire
      // businessPartner='350000261'; //bp DF1
      console.log("Vous êtes en locale : Votre Bp est '1510136444'");
    }

    if (!businessPartner) {
      console.error('Erreur : Pas de business Partner lié à ce compte');
      return
    }

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