import { CommonModule } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from '../../../../shared/services/contract.service';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { AppDocumentsContractHeaderComponent } from '../../components/contract-header/contract-header.component';
import { FormsModule } from '@angular/forms';
import { AppDocumentsContractDocumentComponent } from '../../components/contract-document/contract-document.component';
import { AppDocumentsContractPaymentComponent } from '../../components/contract-payment/contract-payment.component';
import { AppDocumentsContractInvoiceComponent } from '../../components/contract-invoice/contract-invoice.component';
import { AppDocumentsContractServiceComponent } from '../../components/contract-service/contract-service.component';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { Mandate } from '../../../../shared/models/mandate.model';
import { MandateService } from '../../services/mandate.service';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UpdateRibResult } from '../../../../shared/models/update-rib-result.model';

@Component({
  selector: 'app-contract-details',
  imports: [CommonModule, FormsModule, ToastModule, AppDocumentsContractHeaderComponent, AppDocumentsContractDocumentComponent, AppDocumentsContractPaymentComponent, AppDocumentsContractInvoiceComponent, AppDocumentsContractServiceComponent],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss',
  providers: [MessageService]
})
export class AppDocumentContractDetailsComponent {
  contractDetails: ContractDetails | undefined;
  allContracts: ContractDetails[] = [];
  contractsList: Signal<Contract[]>;
  contract: Contract | undefined;
  currentUser: Signal<User | null>;
  mandates: Mandate[] = [];
  bankIdInput: string = '';
  businessPartnerBankId: string = '';
  contractIsu: string[] = [];

  constructor(private router: Router,
    private contractService: ContractService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private mandateService: MandateService) {

    this.contractsList = this.contractService.contracts;
    this.currentUser = this.authService.currentUSer;

    this.activatedRoute.params.subscribe(params => {
      this.contractIsu.push(params['contractIsu']);
      this.contract = this.contractsList().find(item => item.ContractISU === params['contractIsu']);
      this.loadContract(this.contractIsu);
    });
  }

  private loadContract(contractIsu: string[]) {
    this.contractService.getContractsByContractISUList(contractIsu).subscribe({
      next: (contracts: ContractDetails[]) => {
        this.contractDetails = contracts[0];
        this.businessPartnerBankId = this.contractDetails.BusinessPartnerBankId;
        this.loadMandate([this.businessPartnerBankId]);
      }
    });
  }

  navigateToService() {
    this.router.navigate(["/services/serenity-electricity"]);
  }

  RetourEnBack() {
    this.router.navigate(['documents']);
  }

  private loadMandate(partnerBankIds: string[]): void {
    this.mandateService.getMandate(partnerBankIds).subscribe({
      next: (data: Mandate[]) => {
        this.mandates = data;
        console.log('Mandates chargés:', this.mandates);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du mandate:', error);
        alert('Impossible de charger le mandat.');
      },
    });
  }

  updateBankAccount(ribChangedResult: UpdateRibResult) {

    if (ribChangedResult.RibChanged) {
      this.loadContract(this.contractIsu);
      this.messageService.add({
        severity: 'success',
        summary: 'Opération réussie',
        detail: `Modification de rib effectué avec succès !`
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Oups !',
        detail: `Modification d'iban échoué : ${ribChangedResult.ErrorMessage ? ribChangedResult.ErrorMessage : ''}`
      });
    }
  }

  updateBillingDay(bllingDayUpdated: boolean) {
    if (bllingDayUpdated) {
      this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: `Modification de date de prélèvement réussie !` });
      this.loadContract(this.contractIsu);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: `Modification de date de prélèvement échouée !` });
    }
  }

  updateBillingAddress(bllingAddressUpdated: boolean) {
    if (bllingAddressUpdated) {
      this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: `Modification d'adresse réussie !` });
      this.loadContract(this.contractIsu);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Oups !', detail: `Modification d'adresse' échouée !` });
    }
  }
}
