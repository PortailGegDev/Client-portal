import { Injectable } from '@angular/core';
import { map, Observable, of, Subject, switchMap } from 'rxjs';
import { ContractHttpService } from '../../core/http-services/contrat-http.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractSubject = new Subject<any>();
  contract$ = this.contractSubject.asObservable();

  selectedContract: any;
  contracts: any[] = [];
  contractPartner: any[] = []; 

  constructor(private contractHttpService: ContractHttpService,) { }

  getAllBpContracts(bp:string) : Observable<any>{
    return this.getContractsPartner(bp).pipe(
      switchMap((contractISUs:any)=>{
        let filter=`ContractISU eq '${contractISUs[0]}'`;
        contractISUs.forEach((element: String)=> {
          if(contractISUs.indexOf(element)===0){
            return ;
          }
          filter=filter+` or ContractISU eq '${element}'`;
        });
        // debugger;
        return this.getContractsByContractISU(filter);
        
      })
    );
  }

  getContractsByContractISU(contractISUs: string): Observable<any> {
    return this.contractHttpService.fetchContractISU(contractISUs)
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

  getContractsPartner(CCBusinessPartner: string): Observable<String[]> {
  return this.contractHttpService.fetchContractPartner(CCBusinessPartner) 
      .pipe(
        map((contracts:any) => {
              this.contractPartner = contracts;
              const contractPartnerISU = [...new Set(this.contractPartner.map(item => item.ContractISU))];
        return contractPartnerISU;
        })
      );
    //   .subscribe(data => {
    //     console.log('Données reçues dans le composant :', data);
    //     this.contractPartner = data;
    //     const contractPartnerBp = [...new Set(this.contractPartner.map(item => item.BusinessPartner))];
    //     console.log(contractPartnerBp)
    //   }
    // );
  }

  changeContract(contract: any) {
    this.selectedContract = contract;
    this.contractSubject.next(this.selectedContract);
  }


}
