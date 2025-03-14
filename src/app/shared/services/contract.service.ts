import { computed, Injectable, signal } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { ContractHttpService } from '../../core/http-services/contrat-http.service';
import { ContractPartner } from '../models/contract-partner.model';
import { Contract } from '../models/contract.model';
import { ContractDetails } from '../models/contract-details.model';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private contractsSignal = signal<Contract[]>([]);
  private selectedContractSignal = signal<Contract | null>(null);
  private isSelectedContractPartnerSignal = signal<boolean>(false);

  contracts = computed(() => this.contractsSignal());
  selectedContract = computed(() => this.selectedContractSignal());
  isSelectedContractPartner = computed(() => this.isSelectedContractPartnerSignal());

  partnerContract: ContractPartner[] = [];

  constructor(private contractHttpService: ContractHttpService) { }

  getContractByBusinessPartner(businessPartner: string): Observable<Contract[]> {
    return this.contractHttpService.fetchContractByBusinessPartner(businessPartner)
      .pipe(
        map((contracts: Contract[]) => {
          this.contractsSignal.set(contracts);

          if (this.contracts().length > 0) {
            // Le premier contrat sera sélectionné par défaut
            this.selectedContractSignal.set(this.contracts()[0]);

            // Enregistrer l'utilisateur en cours s'il est partenaire
            const isSelectedContractTitular = this.selectedContractSignal()?.PartnerFct === '00000001';
            this.updateSelectedPartnerContract(!isSelectedContractTitular);
          }

          return this.contracts();
        })
      );
  }

  getAllBpContracts(businessPartner: string): Observable<ContractDetails[]> {
    return this.getContractsPartner(businessPartner).pipe(
      switchMap((contracts: ContractPartner[]) => {

        if (contracts.length === 0) {
          console.log('Information : Pas de contrat partenaire');
          return [];
        }

        const contractsISUList = contracts.map(item => item.ContractISU);

        return this.getContractsByContractISUList(contractsISUList);
      })
    );
  }

  getContractsByContractISUList(contractsISUList: string[]): Observable<ContractDetails[]> {
    let filter = `ContractISU eq '${contractsISUList[0]}'`;
    contractsISUList.forEach((element: string) => {
      if (contractsISUList.indexOf(element) === 0) {
        return;
      }

      filter = filter + ` or ContractISU eq '${element}'`;
    });

    return this.contractHttpService.fetchContractISU(filter);
  }

  getContracts(businessPartner: string): Observable<any> {
    return this.contractHttpService.fetchContractISU(businessPartner);
  }

  getContractsPartner(businessPartner: string): Observable<ContractPartner[]> {
    return this.contractHttpService.fetchContractPartner(businessPartner)
      .pipe(
        map((contracts: any[]) => {
          this.partnerContract = contracts.map((contract) => ({
            contractISU: contract.ContractISU,
            businessPartner: contract.BusinessPartner,
            ccBusinessPartner: contract.CCBusinessPartner,
            partnerFunction: contract.ContractAccount,
            contractAccount: contract.ContractISU,
            isPartner: contract.PartnerFct !== '00000001'
          } as ContractPartner));

          return this.partnerContract;
        })
      );
  }

  changeContract(contract: any) {
    this.selectedContractSignal.set(contract);
  }

  updateSelectedPartnerContract(isContractPartner: boolean) {
    this.isSelectedContractPartnerSignal.set(isContractPartner);
  }


  
  
}
