import { CommonModule } from '@angular/common';
import { Component, effect, numberAttribute, Signal } from '@angular/core';
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
import { Bank } from '../../../../shared/models/bank.model';
import { Mandate } from '../../../../shared/models/mandate.model';
import { MandateService } from '../../services/mandate.service';
import { BankService } from '../../services/bank.service';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { UpdateRib } from '../../../../shared/models/update-rib.model';
import { CreateMandat } from '../../../../shared/models/create-mandat.model';
import { ContractUpdate } from '../../../../shared/models/contract/contract-update.model';
import { Constants } from '../../../../shared/utils/constants';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    private bankService: BankService,
    private messageService: MessageService,
    private mandateService: MandateService) {
    this.contractsList = this.contractService.contracts;
    this.currentUser = this.authService.currentUSer;


    this.activatedRoute.params.subscribe(params => {
      this.contractIsu.push(params['contractIsu']);

      this.contract = this.contractsList().find(item => item.ContractISU === params['contractIsu']);
      this.loadContract(this.contractIsu);


    });

    effect(() => {
      const bp = this.authService.businessPartner();

      // if (bp) {
      //   this.loadBankAccount(bp);
      // }
    });
  }

  private loadContract(contractIsu: string[]) {
    this.contractService.getContractsByContractISUList(contractIsu).subscribe({
      next: (contracts: ContractDetails[]) => {
        this.contractDetails = contracts[0];
        this.businessPartnerBankId = this.contractDetails.BusinessPartnerBankId;
        this.loadMandate([this.businessPartnerBankId]);
      }
    })
  }

  navigateToService() {
    this.router.navigate(["/services/serenity-electricity"]);
  }

  RetourEnBack() {
    this.router.navigate(['documents']);
  }

  // private loadBankAccount(businessPartner: string): void {
  //   this.bankService.getCompteBancaire(businessPartner).subscribe({
  //     next: (banks: Bank[]) => {
  //       if (banks) {
  //         let partnerBankIds = banks.map(item => item.BusinessPartnerBankId);
  //         this.loadMandate(partnerBankIds);;
  //       }
  //     },
  //     error: (error: any) => {
  //       console.error('Erreur lors de la récupération du compte bancaire:', error);
  //     }
  //   });
  // }

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

  submitBankChange(rib: { iban: string; AccountpayerName: string }): void {
    const iban = rib.iban?.trim();
    const AccountpayerName = rib.AccountpayerName?.trim();

    if (this.contractDetails?.PaymentMethod !== Constants.PaymentMethod.P) {
      console.error("Opération invalide : Pas de rib lié à cette méthode de paiement !");
      return;
    }

    if (!this.contract?.PayerPartnerId) {
      console.error("Le BusinessPartner du payeur est introuvable introuvable.");
      return;
    }

    if (!iban) {
      console.error("Veuillez entrer un identifiant bancaire.");
      return;
    }

    if (!AccountpayerName) {
      console.error("Veuillez entrer le nom de payeur .");
      return;
    }

    const updateRib: UpdateRib = {
      BusinessPartner: this.contractDetails!.BusinessPartner,
      BusinessPartnerB2B: this.contractDetails!.BusinessPartnerB2B,
      IBAN: iban,
      BankAccountHolderName: AccountpayerName,
    };

    this.bankService.createCompteBancaire(updateRib).subscribe({
      next: (response: Bank | null) => {

        if (!response) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Réponse du serveur vide lors de la création du compte bancaire.'
          });
          return;
        
        }

        const createMandat: CreateMandat = {
          SEPAMandate: this.mandateService.generateSEPAMandate(this.contract!.ContractISU, this.contract!.PartnerId),
          BusinessPartnerBankId: response.BusinessPartnerBankId,
          SEPASignatureCityName: this.contract!.CityName,
          SEPASignatureDate: new Date().toISOString().slice(0, 19),
          SEPAMandateStatus: "1",
          SEPAMandateRecipient: this.contractDetails!.ProductSupplier,
        };

        this.mandateService.createMandat(createMandat).subscribe({
          next: (response: any) => {
            console.log("le mandat a crée avec succées")
            const contractUpdate: ContractUpdate = {
              ContractISU: this.contract!.ContractISU,
              BusinessPartnerBankId: createMandat.BusinessPartnerBankId,
              Action: "CHANGE_BANK",
            };

            this.contractService.updateContractDetails(contractUpdate).subscribe({
              next: (response: any) => {
                this.loadContract(this.contractIsu);
                this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: `Changement de banque effectué avec succès !` });
              },
            },)
          }
        });
      },
      error: (error) => {
        console.error("Erreur lors de la modification du compte bancaire :", error);
        this.messageService.add({ severity: 'error', summary: 'Oups !', detail: error });
      },
    });
  }

  validBillingDays: string[] = ["05", "10", "15", "20"];
  updateBillingDay(day: string): void {
    if (!this.contractDetails || !this.contractDetails.BusinessPartnerBankId) {
      console.error("BusinessPartnerBankId non trouvé dans les détails du contrat.");
      return;
    }

    if (!this.validBillingDays.includes(day)) {
      console.error("Jour de prélèvement invalide. Choisissez parmi 05, 10, 15 ou 20.");
      return;
    }

    const contractUpdateDay: ContractUpdate = {
      ContractISU: this.contractDetails.ContractISU,
      BusinessPartnerBankId: this.contractDetails.BusinessPartnerBankId,
      BillingDay: day,
      Action: "CHANGE_BANK",
    };

    this.contractService.updateContractDetails(contractUpdateDay).subscribe({
      next: () => {
        this.loadContract(this.contractIsu);
        this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: `Modification de date de prélèvement réussi !` });
      },
      error: (error) => {
        console.error("Erreur lors de la mise à jour :", error);
        this.messageService.add({ severity: 'error', summary: 'Oups !', detail: error });
      }
    });
  }



  onAddressUpdated(event: { number: string; street: string; postalCode: string; city: string }) {
    const contractUpdateAddress: ContractUpdate = {
      ContractISU: this.contractDetails!.ContractISU,
      HouseNumber: event.number,
      StreetName: event.street,
      PostalCode: event.postalCode,
      CityName: event.city,
      Action: "CHANGE_BANK",
    };
    this.contractService.updateContractDetails(contractUpdateAddress).subscribe({
      next:()=> {
        this.loadContract(this.contractIsu);
      }
    })
  }
  
}
