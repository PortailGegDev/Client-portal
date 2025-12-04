import { Component, effect, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { ContractService } from '../../../../shared/services/contract.service';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { Constants } from '../../../../shared/utils/constants';
import { AppServicesSerenityElectricityComponent } from '../serenity-electricity/serenity-electricity.component';
import { AppServicesGreenOptionComponent } from '../green-option/green-option.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    ActiveContractComponent,
    AppServicesSerenityElectricityComponent,
    RouterModule,
    AppServicesGreenOptionComponent
  ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class AppServicesComponent {

  // état utilisé par le template — on ne l'affecte qu'une fois prêt
  boxData: any[] = [];
  boxesReady = false;

  // copie immuable "master" des boxes (évite de muter Constants.BoxData)
  private allBoxes = Constants.BoxData.map(b => ({ ...b }));

  // flags métier
  isServicepackE = false;
  isServicepackEG = false;
  isPackSereniteEGP = false;
  isOptionSrvArrondiSol = false;
  isGreenOption = false;

  // signal et abonnement
  selectedContract: Signal<Contract | null>;
  private contractsSub: Subscription | null = null;

  constructor(private contractService: ContractService, private router: Router) {
    this.selectedContract = this.contractService.selectedContract;

    // effet : chaque changement de contrat déclenche le chargement
    effect(() => {
      const contract = this.selectedContract();
      if (contract?.ContractISU) {
        this.loadContracts([contract.ContractISU]);
      } else {
        // aucun contrat sélectionné : ne rien afficher (évite flash)
        this.boxData = [];
        this.boxesReady = true;
      }
    });
  }

  loadContracts(contractIsu: string[]): void {
    // annule abonnement précédent pour éviter résultats concurrents
    if (this.contractsSub) {
      this.contractsSub.unsubscribe();
      this.contractsSub = null;
    }

    // blocage d'affichage pendant le chargement
    this.boxesReady = false;
    this.boxData = [];

    this.contractsSub = this.contractService.getContractsByContractISUList(contractIsu).subscribe({
      next: (contracts: ContractDetails[]) => {
        if (!contracts?.length) {
          console.warn('Aucun contrat trouvé pour contractIsu', contractIsu);
          this.boxData = [];
          this.boxesReady = true;
          return;
        }

        const contrat = contracts[0];
        const isElectricity = contrat.BusinessSector === Constants.EnergyType.ELECTRICITY;
        const isTarifReglemente = contrat.ProductName === 'Tarif Réglementé Bleu' && 'Tarif Bleu';


        const pack = contrat.ServicesPack;
        this.isServicepackE = pack === Constants.ServicesPack.ELECTRICITE || pack === Constants.ServicesPack.ELECTRICITE_0;
        this.isServicepackEG = pack === Constants.ServicesPack.ELECTRICITE_GAZ;
        this.isPackSereniteEGP = pack === Constants.ServicesPack.ELECTRICITE_GAZ_PLOMBERIE;
        this.isGreenOption = contrat.GreenOptin !== 'SO';

        // Filtrage + mise à jour des status (on ne mutera pas allBoxes)
        const filtered = this.allBoxes
          .filter(box => {
            if (box.id === Constants.ServicesPack.GREEN_OPTION) {
              return isElectricity && isTarifReglemente; 
            }
            return true;
          })
          .map(box => {
            // Calculer status selon ServicePack
            // Remarque : on compare l'id de la box aux valeurs attendues (tu peux adapter si besoin)
            if (
              (box.id === Constants.ServicesPack.ELECTRICITE && this.isServicepackE) ||
              (box.id === Constants.ServicesPack.ELECTRICITE_0 && this.isServicepackE) ||
              (box.id === Constants.ServicesPack.ELECTRICITE_GAZ && this.isServicepackEG) ||
              (box.id === Constants.ServicesPack.ELECTRICITE_GAZ_PLOMBERIE && this.isPackSereniteEGP)
            ) {
              return { ...box, status: 'souscrit' };
            }

            if (box.id === Constants.ServicesPack.GREEN_OPTION && this.isGreenOption) {
              return { ...box, status: 'souscrit' };
            }

            return { ...box, status: '' };
          });

        // Affectation unique => plus de flash
        this.boxData = filtered;
        this.boxesReady = true;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contrats:', err);
        this.boxData = [];
        this.boxesReady = true;
      }
    });
  }

  goToBox(box: any) {
    if (!box?.link) return;
    this.router.navigate([box.link], { state: { box } });

  }

  trackByTitle(index: number, box: any) {
    return box?.title ?? index;
  }

  }
