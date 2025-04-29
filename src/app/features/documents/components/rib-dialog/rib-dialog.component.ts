import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AngularIbanModule, ValidatorService } from 'angular-iban';
import { UpdateRib } from '../../../../shared/models/update-rib.model';
import { BankService } from '../../services/bank.service';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { CreateMandat } from '../../../../shared/models/create-mandat.model';
import { ContractUpdate } from '../../../../shared/models/contract/contract-update.model';
import { MandateService } from '../../services/mandate.service';
import { Constants } from '../../../../shared/utils/constants';
import { Bank } from '../../../../shared/models/bank.model';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { ContractService } from '../../../../shared/services/contract.service';

@Component({
  selector: 'app-documents-contract-rib-dialog',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, AngularIbanModule],
  templateUrl: './rib-dialog.component.html',
  styleUrl: './rib-dialog.component.scss'
})
export class AppDocumentsContractRibDialogComponent {

  @Input() contractDetails: ContractDetails | undefined;
  @Input() contract: Contract | undefined;

  @Output() onCancelClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onRibChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  newRib: any = '';
  payerName: string = '';
  newBusinessPartnerBankId: string = '';
  form: FormGroup;

  get ibanForm(): any { return this.form.get('iban'); }
  get titularForm(): any { return this.form.get('titular'); }

  constructor(private formBuilder: FormBuilder,
    private bankService: BankService,
    private mandateService: MandateService,
    private contractService: ContractService
  ) {
    this.form = this.formBuilder.group({
      iban: ['', [Validators.required, ValidatorService.validateIban]],
      titular: ['', Validators.required]
    });
  }

  submitNewRib() {
    const iban = this.ibanForm?.value?.trim();
    const AccountpayerName = this.titularForm?.value?.trim();

    if (this.contractDetails?.PaymentMethod !== Constants.PaymentMethod.P) {
      console.error("Opération invalide : Pas de rib lié à cette méthode de paiement !");
      this.onRibChanged.emit(false);
      return;
    }

    if (!this.contract?.PayerPartnerId) {
      console.error("Le BusinessPartner du payeur est introuvable !");
      this.onRibChanged.emit(false);
      return;
    }

    if (!iban) {
      console.error("Veuillez entrer un identifiant bancaire.");
      this.onRibChanged.emit(false);
      return;
    }

    if (!AccountpayerName) {
      console.error("Veuillez entrer le nom de payeur .");
      this.onRibChanged.emit(false);
      return;
    }

    const updateRib: UpdateRib = {
      BusinessPartner: this.contractDetails!.BusinessPartner,
      BusinessPartnerB2B: this.contractDetails!.BusinessPartnerB2B,
      IBAN: iban,
      BankAccountHolderName: AccountpayerName,
    };

    // this.bankService.createCompteBancaire(updateRib).subscribe({
    //   next: (response: Bank | null) => {

    // if (!response) {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Erreur',
    //     detail: 'Réponse du serveur vide lors de la création du compte bancaire.'
    //   });
    //   return;

    // }
    //     if (!response) {
    //       return;
    //     }

    //     const createMandat: CreateMandat = {
    //       SEPAMandate: this.mandateService.generateSEPAMandate(this.contract!.ContractISU, this.contract!.PartnerId),
    //       BusinessPartnerBankId: response.BusinessPartnerBankId,
    //       SEPASignatureCityName: this.contract!.CityName,
    //       SEPASignatureDate: new Date().toISOString().slice(0, 19),
    //       SEPAMandateStatus: "1",
    //       SEPAMandateRecipient: this.contractDetails!.ProductSupplier,
    //     };

    //     this.mandateService.createMandat(createMandat).subscribe({
    //       next: (response: any) => {
    //         console.log("le mandat a crée avec succées")
    //         const contractUpdate: ContractUpdate = {
    //           ContractISU: this.contract!.ContractISU,
    //           BusinessPartnerBankId: createMandat.BusinessPartnerBankId,
    //           Action: "CHANGE_BANK",
    //         };

    //         this.contractService.updateContractDetails(contractUpdate).subscribe({
    //           next: (response: any) => {
    //             this.loadContract(this.contractIsu);
    //             this.messageService.add({ severity: 'success', summary: 'Opération réussie', detail: `Changement de banque effectué avec succès !` });
    //           },
    //         },)
    //       }
    //     });
    //   },
    //   error: (error) => {
    //     console.error("Erreur lors de la modification du compte bancaire :", error);
    //     this.messageService.add({ severity: 'error', summary: 'Oups !', detail: error });
    //   },
    // });

    this.bankService.createCompteBancaire(updateRib).pipe(
      tap((response: Bank | null) => {
        if (!response) {
          this.onRibChanged.emit(false);
        }
      }),
      filter((bank: Bank | null) => !!bank && !!this.contract && !!this.contractDetails),


      map((bank: Bank | null) => {
        this.newBusinessPartnerBankId = bank!.BusinessPartnerBankId;
        const createMandat: CreateMandat = {
          SEPAMandate: this.mandateService.generateSEPAMandate(this.contract!.ContractISU, this.contract!.PartnerId),
          BusinessPartnerBankId: bank!.BusinessPartnerBankId,
          SEPASignatureCityName: this.contract!.CityName,
          SEPASignatureDate: new Date().toISOString().slice(0, 19),
          SEPAMandateStatus: "1",
          SEPAMandateRecipient: this.contractDetails!.ProductSupplier,
        };

        return createMandat;
      }),
      switchMap((mandat: CreateMandat) => {
        return this.mandateService.createMandat(mandat);
      }),
      switchMap(() => {

        const contractUpdate: ContractUpdate = {
          ContractISU: this.contract!.ContractISU,
          BusinessPartnerBankId: this.newBusinessPartnerBankId,
          Action: "CHANGE_BANK",
        };

        return this.contractService.updateContractDetails(contractUpdate);
      }),
      catchError(error => {
        console.error("Erreur globale :", error);
        this.onRibChanged.emit(false);
        return of(null);
      })
    ).subscribe({
      next: (response: any) => {
        this.onRibChanged.emit(true);
      },
      error: (error: any) => {
        console.error("Erreur lors de la modification du compte bancaire :", error);
        this.onRibChanged.emit(false);
      }
    });
  }

}
