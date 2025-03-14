import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from '../../../../shared/services/contract.service';
import { ContractDetails } from '../../../../shared/models/contract-details.model';
import { AppDocumentsContractHeaderComponent } from '../../components/contract-header/contract-header.component';
import { FormsModule } from '@angular/forms';
import { AppDocumentsContractDocumentComponent } from '../../components/contract-document/contract-document.component';
import { AppDocumentsContractPaymentComponent } from '../../components/contract-payment/contract-payment.component';
import { AppDocumentsContractInvoiceComponent } from '../../components/contract-invoice/contract-invoice.component';

@Component({
  selector: 'app-contract-details',
  imports: [CommonModule, FormsModule, AppDocumentsContractHeaderComponent, AppDocumentsContractDocumentComponent, AppDocumentsContractPaymentComponent, AppDocumentsContractInvoiceComponent],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss',
})
export class AppDocumentContractDetailsComponent {
  contracts: ContractDetails[] = [];
  allContracts: ContractDetails[] = [];
  constructor(private router: Router,
    private contractService: ContractService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      const contractIsu:string[]=[];
       contractIsu.push(params['contractIsu'])
      this.contractService.getContractsByContractISUList(contractIsu).subscribe({
        next: (contracts: ContractDetails[]) => { this.contracts = contracts }
      })
    });
  }

  private loadContract(contractsISUList: string[]) {
    this.contractService.getContractsByContractISUList(contractsISUList).subscribe({

      next: (contracts: ContractDetails[]) => {
        this.allContracts = contracts;
        console.log(contracts);
      }
    });
  }

  navigateToService() {
    this.router.navigate(["/services/serenity-electricity"]);
  }

  RetourEnBack() {
    this.router.navigate(['documents']);
  }

}
