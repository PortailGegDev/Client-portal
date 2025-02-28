import { Injectable } from '@angular/core';
import { map, Observable, of, Subject, switchMap } from 'rxjs';
import { ContractHttpService } from '../../core/http-services/contrat-http.service';
import { Contract } from '../models/contract-partner.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractSubject = new Subject<any>();
  contract$ = this.contractSubject.asObservable();

  private contractPartnerSubject = new Subject<boolean>();
  contractPartner$ = this.contractPartnerSubject.asObservable();

  selectedContract: any;
  contracts: any[] = [];
  partnerContract: Contract[] = [];

  constructor(private contractHttpService: ContractHttpService,
    private localStorageService: LocalStorageService
  ) { }

  get contractPartner(): any | null {
    return this.localStorageService.getItem('partnerContract');
  }

  getAllBpContracts(bp: string): Observable<Contract[]> {
    return this.getContractsPartner(bp).pipe(
      switchMap((contracts: Contract[]) => {
        
        if (contracts.length === 0) {
          console.log('Information : Pas de contrat partenaire');
          return [];
        }

        let filter = `ContractISU eq '${contracts[0].contractISU}'`;

        contracts.forEach((element: Contract) => {
          if (contracts.indexOf(element) === 0) {
            return;
          }

          filter = filter + ` or ContractISU eq '${element.contractISU}'`;
        });

        return this.getContractsByContractISU(filter);
      })
    );
  }

  getContractsByContractISU(contractISUs: string): Observable<any[]> {
    return this.contractHttpService.fetchContractISU(contractISUs)
      .pipe(
        map((contracts: any) => {
          this.contracts = contracts;

          if (this.contracts.length > 0) {
            // Le premier contrat sera sélectionné par défaut
            this.selectedContract = this.contracts[0];
            this.contractSubject.next(this.selectedContract);

            // Enregistrer l'utilisateur en cours s'il est partenaire
            const partnerContract = this.partnerContract?.filter(item => item.contractISU === this.selectedContract.ContractISU)
              .map(item => ({ contract: item.contractISU, isPartner: item.isPartner }));
            this.localStorageService.setItem('partnerContract', partnerContract)
          }

          return this.contracts;
        })
      );
  }

  getContracts(bp: string): Observable<any> {
    return this.contractHttpService.fetchContractISU(bp)
      .pipe(
        map((contracts: any) => {
          this.contracts = contracts;

          if (this.contracts.length > 0) {
            this.selectedContract = this.contracts[0]; // Le premier contrat sera sélectionné par défaut
            this.contractSubject.next(this.selectedContract);
          }

          return this.contracts;
        })
      );
  }

  getContractsPartner(businessPartner: string): Observable<Contract[]> {
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
          } as Contract));

          return this.partnerContract;
        })
      );
  }

  changeContract(contract: any) {
    this.selectedContract = contract;
    this.contractSubject.next(this.selectedContract);
  }
}
