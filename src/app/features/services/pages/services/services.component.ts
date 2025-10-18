import { Component, effect, OnInit, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { ContractService } from '../../../../shared/services/contract.service';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { Constants } from '../../../../shared/utils/constants';
import { AppServicesSerenityElectricityComponent } from '../serenity-electricity/serenity-electricity.component';
import { AppServicesGreenOptionComponent } from '../green-option/green-option.component';
@Component({
  selector: 'app-services',
  imports: [CommonModule, ActiveContractComponent,AppServicesSerenityElectricityComponent,RouterModule,AppServicesGreenOptionComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class AppServicesComponent {

  isServicepackE: boolean = false;  // Sérénité électrique
  isServicepackEG: boolean = false;  // Sérénité électrique,Gaz
  isPackSereniteEGP: boolean = false;  // Sérénité électrique,Gaz_Plomberie
  isOptionSrvArrondiSol: boolean = false;
  isGreenOption: boolean = false;
  selectedContract: Signal<Contract | null>;
  contractIsu: string[] = [];
  boxData = Constants.BoxData;

  constructor(private contractService: ContractService, private router:Router) {
    this.selectedContract = this.contractService.selectedContract;

    // 🔹 Lien automatique entre contrat sélectionné et services
    effect(() => {
      const contract = this.selectedContract();
      if (contract?.ContractISU) {
        this.loadContracts([contract.ContractISU]);
      }
    });
  }

loadContracts(contractIsu: string[]): void {
  this.contractService.getContractsByContractISUList(contractIsu).subscribe({
    next: (contracts: ContractDetails[]) => {
      if (!contracts?.length) {
        console.warn('Aucun contrat trouvé pour contractIsu', contractIsu);
        return;
      }
      const contrat = contracts[0];
      const pack = contrat.ServicesPack;

      this.isServicepackE   = pack === Constants.ServicesPack.ELECTRICITE || pack === Constants.ServicesPack.ELECTRICITE_0;
      this.isServicepackEG  = pack === Constants.ServicesPack.ELECTRICITE_GAZ;
      this.isPackSereniteEGP = pack === Constants.ServicesPack.ELECTRICITE_GAZ_PLOMBERIE;
      // this.isOptionSrvArrondiSol = contrat.SrvArrondiSol !== 'false';
      this.isGreenOption = contrat.GreenOptin !== 'SO';

      // 🔹 Mise à jour du status des box
      this.boxData = this.boxData.map(box => {
        if (
          (box.id === 'OPT_SRN_E'   && this.isServicepackE) ||
          (box.id === 'OPT_SRN_EG'  && this.isServicepackEG) ||
          (box.id === 'PCKSRN_EGP'  && this.isPackSereniteEGP) ||
          (box.id === 'GREEN_OPTION' && this.isGreenOption)
        ) {
          return { ...box, status: 'souscrit' };
        }
        return { ...box, status: '' }; // ou 'non souscrit'
      });
    },
    error: (err) => console.error('Erreur lors de la récupération des contrats:', err)
  });
}


goTo(link: string, box: any) {
  if (link) {
    this.router.navigate([link], { state: { box } });
  }
}



trackByTitle(index: number, box: any) {
  return box.title;
}

  shouldDisplayBox(boxId: string | undefined): boolean {
    // Si le box n'est pas lié à un ServicePack, il est toujours affiché
    if (!boxId) return true;

    return (
      (boxId === 'OPT_SRN_E' && this.isServicepackE) ||
      (boxId === 'OPT_SRN_EG' && this.isServicepackEG) ||
      (boxId === 'PCKSRN_EGP' && this.isPackSereniteEGP) ||
      (boxId === 'GREEN_OPTION' && this.isGreenOption) ||
      (boxId === 'SrvArrondiSol' && this.isOptionSrvArrondiSol)
    );
  }

// services.component.ts (partie utile)
// dans AppServicesComponent
goToBox(box: any) {
  if (!box?.link) return;
  console.log('parent sending box', box); // debug
  this.router.navigate([box.link], { state: { box } });
}



}
