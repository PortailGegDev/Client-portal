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
import { AppDocumentsContractServiceComponent } from '../../components/contract-service/contract-service.component';
import { Contract } from '../../../../shared/models/contract.model';
import { Bank } from '../../../../shared/models/bank.model';
import { Mandate } from '../../../../shared/models/mandate.model';
import { MandateService } from '../../services/mandate.service';
import { BankService } from '../../services/bank.service';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { UpdateRib } from '../../../../shared/models/update-rib';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';



@Component({
  selector: 'app-contract-details',
  imports: [CommonModule, FormsModule, AppDocumentsContractHeaderComponent, AppDocumentsContractDocumentComponent, AppDocumentsContractPaymentComponent, AppDocumentsContractInvoiceComponent, AppDocumentsContractServiceComponent],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss',
})
export class AppDocumentContractDetailsComponent {
  contractDetails: ContractDetails | undefined;
  allContracts: ContractDetails[] = [];
  contractsList: Signal<Contract[]>;
  contract: Contract | undefined;
  currentUser: Signal<User | null>;
  mandates: Mandate[] = [];
  bankIdInput: string = '';

  constructor(private router: Router,
    private contractService: ContractService, 
    private activatedRoute: ActivatedRoute, 
    private authService: AuthService,
    private bankService: BankService,
    private mandateService: MandateService) {
    this.contractsList = this.contractService.contracts;
    this.currentUser = this.authService.currentUSer;
    
    this.activatedRoute.params.subscribe(params => {
      const contractIsu: string[] = [];
      contractIsu.push(params['contractIsu']);

      this.contract = this.contractsList().find(item => item.ContractISU === params['contractIsu']);

      this.contractService.getContractsByContractISUList(contractIsu).subscribe({
        next: (contracts: ContractDetails[]) => { this.contractDetails = contracts[0] }
      })
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

  navigateToService() {
    this.router.navigate(["/services/serenity-electricity"]);
  }

  RetourEnBack() {
    this.router.navigate(['documents']);
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

  submitBankChange(newRib: string): void {
  let businessPartner = this.authService.getUserData()?.bp;

    const iban = newRib?.trim();  // Utilise bien le paramètre reçu
    if (!businessPartner) {
      businessPartner = '1510136444';
      console.warn("BusinessPartner introuvable, valeur par défaut utilisée.");
    }

    if (!iban) {
      console.error("Veuillez entrer un identifiant bancaire.");
      return;
    }

    const updateRib: UpdateRib = {
      BusinessPartnerId: businessPartner,
      IBAN: iban,
      BankAccountHolderName: "Alain Dupre"
    };

    this.bankService.createCompteBancaire(updateRib).subscribe({
      next: (response) => {
        console.log("Compte bancaire modifié avec succès :", response);
        alert("Changement de compte bancaire effectué avec succès !");
      },
      error: (error) => {
        console.error("Erreur lors de la modification du compte bancaire :", error);
        alert("Échec du changement de compte bancaire.");
      }
    });
  }


}
