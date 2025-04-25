import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { Mandate } from '../../../../shared/models/mandate.model';
import { MaskRIBPipe } from '../../../../shared/pipe/mask-rib.pipe';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { InputTextModule } from 'primeng/inputtext';
import { Constants } from '../../../../shared/utils/constants';
import { formatDateFr } from '../../../../shared/utils/date-utilities';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppDocumentsContractBillingDateDialogComponent } from '../billing-date-dialog/billing-date-dialog.component';

@Component({
  selector: 'app-documents-contract-payment',
  imports: [AppDocumentsContractBillingDateDialogComponent, CommonModule, FormsModule, SelectButtonModule, InputTextModule, InputNumberModule, DialogModule, CardModule, ButtonModule, TimeSpanToDatePipe, MaskRIBPipe, DropdownModule, TableModule],
  templateUrl: './contract-payment.component.html',
  styleUrl: './contract-payment.component.scss'
})
export class AppDocumentsContractPaymentComponent {
  @Input() mandates: Mandate[] = [];
  @Input() contractDetails: ContractDetails | undefined;
  @Output() ribUpdated = new EventEmitter<{ iban: string, AccountpayerName: string }>();
  @Output() billingDayChanged = new EventEmitter<boolean>();

  showUpdateRibDialog: boolean = false;
  showUpdateDateDialog: boolean = false;
  showEchtable: boolean = false;

  newRib: any = '';
  payerName: string = '';
  currentDate: string = formatDateFr(new Date());
  paiements = [
    { date: '', montant: '' },
    { date: '', montant: '' },
    { date: '', montant: '' },
    { date: '', montant: '' },
    { date: '', montant: '' },
    { date: '', montant: '' }
  ];

  get paymentProcess(): string {
    if (!this.contractDetails) {
      return '';
    }

    let process = this.contractDetails?.PaymentMethod === Constants.PaymentMethod.P ? 'Prélèvement' : 'Paiement';

    if (this.contractDetails.PaymentProcedure === Constants.PaymentProcedure.BIM) {
      process += ' bimestriel';
    }

    if (this.contractDetails.PaymentProcedure === Constants.PaymentProcedure.MEN ||
      this.contractDetails.PaymentProcedure === Constants.PaymentProcedure.ECH
    ) {
      process += ' mensuel';
    }

    return process;
  }

  get hasPaymentProcedureEch(): boolean {
    return this.contractDetails?.PaymentProcedure === Constants.PaymentProcedure.ECH;
  }

  get hasPaymentMethodP(): boolean {
    return this.contractDetails?.PaymentMethod === Constants.PaymentMethod.P;
  }


  submitNewRib(): void {
    if (this.newRib?.trim() && this.payerName?.trim()) {
      this.ribUpdated.emit({
        iban: this.newRib.trim(),
        AccountpayerName: this.payerName.trim()
      });

      this.showUpdateRibDialog = false;
    } else {
      alert("L'IBAN et le nom du titulaire du compte sont obligatoires.");
    }
  }

  onBillingDayChanged(billingDateChanged: boolean): void {
    this.billingDayChanged.emit(billingDateChanged);
    this.showUpdateDateDialog = false;
  }

  openTable() {
    this.showEchtable = true;
  }

}