import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { AuthService } from '../../../../core/http-services/auth.service';
import { ContractService } from '../../../../shared/services/contract.service';
import { AppDocumentsContractsComponent } from '../../components/contracts/contracts.component';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { AppDocumentsMandatsComponent } from '../../components/mandats/mandats.component';
import { User } from '../../../../shared/models/user.model';
import { BankService } from '../../services/bank.service';
import { MandateService } from '../../services/mandate.service';
import { Bank } from '../../../../shared/models/bank.model';
import { Mandate } from '../../../../shared/models/mandate.model';
import { AppDocumentsJustificatifsComponent } from '../../components/justificatifs/justificatifs.component';
import { ButtonModule } from 'primeng/button';
import { Constants } from '../../../../shared/utils/constants';

@Component({
  selector: 'app-documents',
  imports: [CommonModule, TabsModule, AppDocumentsContractsComponent, AppDocumentsMandatsComponent, AppDocumentsJustificatifsComponent, ButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AppDocumentsComponent {
  showDetails = false;
  selectedContract: any = null;
  contractDetails: ContractDetails | undefined;
  currentSection: string = 'contrat'; // Par défaut, afficher la section "Contrat"
  contracts: Signal<Contract[]>;
  currentUser: Signal<User | null>;

  mandates: Mandate[] = [];
  businessPartnerBankId: string = '';


  allContracts: ContractDetails[] = [];

  constructor(private router: Router,
    private authService: AuthService,
    private contractService: ContractService,
    private bankService: BankService,
    private mandateService: MandateService) {

    this.contracts = this.contractService.contracts;
    this.currentUser = this.authService.currentUSer;

    effect(() => {
      if (this.contracts()) {
        const contractsISUList = this.contracts().map(item => item.ContractISU);
        this.loadContract(contractsISUList);
      }

      const bp = this.authService.businessPartner();

      if (bp) {
        this.loadBankAccount(bp);
      }
    });
  }

  private loadContract(contractsISUList: string[]) {
    this.contractService.getContractsByContractISUList(contractsISUList).subscribe({

      next: (contracts: ContractDetails[]) => {
        this.allContracts = contracts;
        console.log(contracts);
        this.contractDetails = contracts[0];
        this.businessPartnerBankId = this.contractDetails.BusinessPartnerBankId;
        this.loadMandate([this.businessPartnerBankId]);
      }
    });
  }

  private loadBankAccount(businessPartner: string): void {
    this.bankService.getCompteBancaire(businessPartner).subscribe({
      next: (banks: Bank[]) => {
        if (banks) {
          let partnerBankIds = banks.map(item => item.BusinessPartnerBankId);
          this.loadMandate(partnerBankIds);;
        }
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération du compte bancaire:', error);
      }
    });
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

  showSection(section: string) {
    this.currentSection = section;
  }

  viewDetails(item: any) {
    this.router.navigate(['/documents/contract-details']);
  }

  backToList() { }

  navigateToContractCreationLink() {
    window.open(Constants.ContractCreationLink, '_blank');
  }
}
