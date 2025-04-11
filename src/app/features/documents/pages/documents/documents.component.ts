import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { AuthService } from '../../../../core/http-services/auth.service';
import { ContractService } from '../../../../shared/services/contract.service';
import { AppDocumentsContractsComponent } from '../../components/contracts/contracts.component';
import { Contract } from '../../../../shared/models/contract.model';
import { ContractDetails } from '../../../../shared/models/contract-details.model';
import { AppDocumentsMandatsComponent } from '../../components/mandats/mandats.component';
import { User } from '../../../../shared/models/user.model';
import { BankService } from '../../services/bank.service';
import { MandateService } from '../../services/mandate.service';
import { Bank } from '../../../../shared/models/bank.model';
import { Mandate } from '../../../../shared/models/mandate.model';
import { AppDocumentsJustificatifsComponent } from '../../components/justificatifs/justificatifs.component';

@Component({
  selector: 'app-documents',
  imports: [CommonModule, TabsModule, AppDocumentsContractsComponent, AppDocumentsMandatsComponent, AppDocumentsJustificatifsComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AppDocumentsComponent {
  showDetails = false;
  selectedContract: any = null;
  currentSection: string = 'contrat'; // Par défaut, afficher la section "Contrat"
  contracts: Signal<Contract[]>;
  currentUser: Signal<User | null>;

  mandates: Mandate[] = []

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
    });

    this.loadBankAccount();
  }

  private loadContract(contractsISUList: string[]) {
    this.contractService.getContractsByContractISUList(contractsISUList).subscribe({

      next: (contracts: ContractDetails[]) => {
        this.allContracts = contracts;
        console.log(contracts);
      }
    });
  }

  private loadBankAccount(): void {
    let businessPartner = this.authService.getUserData()?.bp;

    if (!businessPartner) {
      // pour tester en locale dans la DF1
      businessPartner = '1510136444';
      // businessPartner = '1510060117'; // bp consommation pour QF1
      // businessPartner = '1510023652'; // bp liste de contrats pour DF1
      // businessPartner = '1510063413'; // bp liste de contrats pour QF1
      // businessPartner='1510031862'; // bp liste de contrats pour partenaire
      // businessPartner='350000261'; //bp DF1
    }


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
}
