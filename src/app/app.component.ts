import { Component, effect, OnInit, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthService } from './core/http-services/auth.service';
import { ContractService } from './shared/services/contract.service';
import { Contract } from './shared/models/contract/contract.model';
import { environment } from '../environments/environment';
import { PrimeNgLocaleService } from './shared/services/prime-ng-locale.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Profil } from './shared/models/profil.model';
import { ProfilService } from './shared/services/profil.service';
import { map } from 'rxjs';
import { SalesforceContact } from './shared/models/salsforceContact.model';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ButtonModule, NavBarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  contracts: Signal<Contract[]>;
  selectedContract: Signal<Contract | null>;
  haveContract: boolean | undefined = undefined;
  currentRoute: string = '';
  profil: Profil | undefined;
  contactId: string | null = null;

  constructor(private authService: AuthService,
    private httpClient: HttpClient,private profilService: ProfilService,
    private router: Router,private profileService: ProfilService,
    private contractService: ContractService,
    private primeNgLocaleService: PrimeNgLocaleService
  ) {
    this.authService.logTokenDetails();
    this.contracts = this.contractService.contracts;
    this.selectedContract = this.contractService.selectedContract;
    this.primeNgLocaleService.applyFrenchLocale();

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });

    effect(() => {
      this.loadContract();
      const bp = this.authService.businessPartner();

      if (bp) {
        this.initProfilEtContact(bp);
      }
    });
  }
  initProfilEtContact(bp: string): void {
    this.profileService.getProfil(bp)
      .pipe(
        map((data: any) => {
          // Récupérer l'objet profil complet (selon ta structure)
          const profil = data.d?.results?.[0] ?? data;
          return profil;  // On renvoie tout le profil
        })
      )
      .subscribe({
        next: (profil: any) => {
          this.profil = profil;
  
          // Afficher le BusinessPartner et tout le profil
          console.log('BusinessPartner:', profil.BusinessPartner);
          console.log('Profil complet:', profil);
          this.testSalesforceAPI();

        },
        error: (error) => {
          console.error('Erreur lors de la récupération des profils:', error);
          this.profil = undefined;
        }
      });
  }

    testSalesforceAPI(): void {
    if (!this.profil?.BusinessPartner) {
      console.error('BusinessPartner non défini');
      return;
    }
    this.profileService.fetchContact(this.profil.BusinessPartner).subscribe({
      next: (contact: SalesforceContact) => {
        this.contactId = contact.Id;
        console.log('Réponse Salesforce complète :', contact);
        console.log('Contact ID récupéré :', this.contactId);
      },
      error: (error) => {
        console.error('Erreur appel API Salesforce :', error);
      }
    });
  }

  loadContract() {
    let businessPartner = this.authService.businessPartner();

    if (environment.local === true) {
      // pour tester en locale dans la DF1
      //  businessPartner = '1510000229'; // avec client précaire
      // businessPartner = '1510000044'; // avec un seul conso
       businessPartner='1510000051' // plusieurs conso
      this.authService.businessPartner.set(businessPartner);
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

  isProfileOrRequestOrLogout(): boolean {
    return ['/profile', '/requests/new', '/logout'].includes(this.currentRoute);
  }
}