import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ContractHttpService } from '../../core/http-services/contrat-http.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractSubject = new Subject<any>();
  contract$ = this.contractSubject.asObservable();

  selectedContract: any;
  contracts: any[] = [];

  constructor(private contractHttpService: ContractHttpService,) { }

  getContracts(bp: string): Observable<any> {
    return this.contractHttpService.fetchContractISU(bp)
      .pipe(
        map((response: any) => {

          if (response?.d?.results) {
            this.contracts = response.d.results; // Récupère le tableau de résultats

            if (this.contracts.length > 0) {
              this.selectedContract = this.contracts[0]; // Le premier contrat sera sélectionné par défaut
              this.contractSubject.next(this.selectedContract);
            }
          } else {
            this.contracts = []; // Assure que contractts est un tableau vide si aucune donnée n'est trouvée
          }

          return this.contracts;
        })
      );
  }

contractPartner:any;
getContractsPartner(CCBusinessPartner:string): Observable<any>{
  return this.contractHttpService.fetchContractPartner(CCBusinessPartner)
  .pipe(
    map((response: any) => {

      if (response?.d?.results) {
        this.contractPartner = response.d.results; // Récupère le tableau de résultats
      } else {
        this.contractPartner = []; // Assure que contractts est un tableau vide si aucune donnée n'est trouvée
      }

      return this.contractPartner;
    })
  );
}

  changeContract(contract: any) {
    this.selectedContract = contract;
    this.contractSubject.next(this.selectedContract);
  }

}
