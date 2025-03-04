import { computed, Injectable, signal } from '@angular/core';
import { map, Observable, of, Subject, switchMap } from 'rxjs';
import { ContractHttpService } from '../../core/http-services/contrat-http.service';
import { ContractPartner } from '../models/contract-partner.model';
import { LocalStorageService } from './local-storage.service';
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

  getAllBpContracts(bp: string): Observable<ContractDetails[]> {
    return this.getContractsPartner(bp).pipe(
      switchMap((contracts: ContractPartner[]) => {

        if (contracts.length === 0) {
          console.log('Information : Pas de contrat partenaire');
          return [];
        }

        let filter = `ContractISU eq '${contracts[0].contractISU}'`;

        contracts.forEach((element: ContractPartner) => {
          if (contracts.indexOf(element) === 0) {
            return;
          }

          filter = filter + ` or ContractISU eq '${element.contractISU}'`;
        });

        return this.getContractsByContractISU(filter);
      })
    );
  }

  getContractsByContractISU(contractISUs: string): Observable<ContractDetails[]> {
    return this.contractHttpService.fetchContractISU(contractISUs);
  }

  getContracts(bp: string): Observable<any> {
    return this.contractHttpService.fetchContractISU(bp);
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
