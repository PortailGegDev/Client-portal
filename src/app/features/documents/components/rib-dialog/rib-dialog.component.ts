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
import { UpdateRibResult } from '../../../../shared/models/update-rib-result.model';

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
  @Output() onRibChanged: EventEmitter<UpdateRibResult> = new EventEmitter<UpdateRibResult>();

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
    const AccountpayerName = this.titularForm?.value;
debugger
    if (this.contractDetails?.PaymentMethod !== Constants.PaymentMethod.P) {
      console.error(`Pas de rib lié à cette méthode de paiement !`);
      this.onRibChanged.emit({ RibChanged: false, ErrorMessage: `Pas de rib lié à cette méthode de paiement !` } as UpdateRibResult);
      return;
    }

    if (!this.contract?.PayerPartnerId) {
      console.error("Le BusinessPartner du payeur est introuvable !");
      this.onRibChanged.emit({ RibChanged: false, ErrorMessage: `Le BusinessPartner du payeur est introuvable !` } as UpdateRibResult);
      return;
    }

    if (!iban) {
      console.error("Veuillez entrer un identifiant bancaire.");
      this.onRibChanged.emit({ RibChanged: false, ErrorMessage: `Veuillez entrer un identifiant bancaire !` } as UpdateRibResult);
      return;
    }

    if (!AccountpayerName) {
      console.error("Veuillez entrer le nom de payeur .");
      this.onRibChanged.emit({
        RibChanged: false,
        ErrorMessage: `Veuillez entrer le nom de payeur !`
      } as UpdateRibResult);
      return;
    }

    const updateRib: UpdateRib = {
      BusinessPartner: this.contractDetails!.BusinessPartner,
      BusinessPartnerB2B: this.contractDetails!.BusinessPartnerB2B,
      IBAN: iban,
      BankAccountHolderName: AccountpayerName,
    };

    this.bankService.createCompteBancaire(updateRib).pipe(
      tap((response: Bank | null) => {
        if (!response) {
          this.onRibChanged.emit({ RibChanged: false, ErrorMessage: `` } as UpdateRibResult);
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
        this.onRibChanged.emit({
          RibChanged: false,
          ErrorMessage: `Errer lors de la modification du compte bancaiure !`
        } as UpdateRibResult);

        return of(null);
      })
    ).subscribe({
      next: () => {
        this.onRibChanged.emit({ RibChanged: true, ErrorMessage: `` } as UpdateRibResult);
      },
      error: (error: any) => {
        console.error("Errer lors de la modification du compte bancaiure :", error);
        this.onRibChanged.emit({ RibChanged: false, ErrorMessage: `Errer lors de la modification du compte bancaiure !` } as UpdateRibResult);
      }
    });
  }
}
