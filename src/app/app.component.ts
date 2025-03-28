import { Component, OnInit, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/http-services/auth.service';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ContractService } from './shared/services/contract.service';
import { BankService } from './shared/services/bank.service';
import { MandateService } from './shared/services/mandate.service';
import { Contract } from './shared/models/contract.model';
import { Bank } from './shared/models/bank.model';
import { Mandate } from './shared/models/mandate.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavBarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  compteBancaire: any; 
   mandate: any; 
  bpBankId = '15200091280003';

  contracts: Signal<Contract[]>;
  selectedContract: Signal<Contract | null>;
  haveContract: boolean | undefined = undefined;

  constructor(private authService: AuthService,private bankService: BankService,
    private mandateService: MandateService,
    private contractService: ContractService
  ) {
    this.authService.logTokenDetails();
    this.contracts = this.contractService.contracts;
    this.selectedContract = this.contractService.selectedContract;
  }

  ngOnInit() {
    this.loadContract();
    this.chargerCompteBancaire();
    this.chargerMandate();

  }


//1er methode pour récupération compte bancaire
chargerCompteBancaire(): void {
  this.bankService.getCompteBancaire(this.bpBankId).subscribe({
    next: (data: Bank | undefined) => { // Accepter undefined
      if (data) { 
        this.compteBancaire = data;
        console.log('Compte bancaire chargé:', this.compteBancaire);
      }
    },
    error: (error: any) => {
      console.error('Erreur lors de la récupération du compte bancaire:', error);
    }
  });
}  

//2eme pour get Mandante
chargerMandate(): void {
 
  this.mandateService.getMandate(this.bpBankId).subscribe({
    next: (data: Mandate | undefined) => {
      this.mandate = data || null;
      console.log('Mandate chargé:', this.mandate);
    },
    error: (error) => {
      console.error('Erreur lors de la récupération du mandate:', error);
      alert('Impossible de charger le mandat.');
    },
  });
}  

  loadContract() {
    let businessPartner = this.authService.getUserData()?.bp;

    if (!businessPartner) {
      // pour tester en locale dans la DF1
      businessPartner = '1510136444';
      // businessPartner = '1510060117'; // bp consommation pour QF1
      // businessPartner = '1510023652'; // bp liste de contrats pour DF1
      // businessPartner = '1510063413'; // bp liste de contrats pour QF1
      // businessPartner='1510031862'; // bp liste de contrats pour partenaire
      // businessPartner='350000261'; //bp DF1
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