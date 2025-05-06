import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
import { AppDocumentsContractRibDialogComponent } from '../rib-dialog/rib-dialog.component';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { UpdateRibResult } from '../../../../shared/models/update-rib-result.model';

@Component({
  selector: 'app-documents-contract-payment',
  imports: [AppDocumentsContractRibDialogComponent, AppDocumentsContractBillingDateDialogComponent, CommonModule, FormsModule, SelectButtonModule, InputTextModule, InputNumberModule, DialogModule, CardModule, ButtonModule, TimeSpanToDatePipe, MaskRIBPipe, DropdownModule, TableModule],
  templateUrl: './contract-payment.component.html',
  styleUrl: './contract-payment.component.scss'
})
export class AppDocumentsContractPaymentComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
   if (this.contractDetails){
    this.billingDay=this.contractDetails.BillingDay ?? '';
   }
  }
  @Input() mandates: Mandate[] = [];
  @Input() contractDetails: ContractDetails | undefined;
  @Input() contract: Contract | undefined;

  @Output() billingDayChanged = new EventEmitter<boolean>();
  @Output() ribChanged = new EventEmitter<UpdateRibResult>();

  showUpdateRibDialog: boolean = false;
  showUpdateDateDialog: boolean = false;
  showEchtable: boolean = false;
  billingDay: string = '';
  // currentDate: string = formatDateFr(new Date());
  paiements = [
    { date: '', montant: '' },
    { date: '', montant: '' },
    { date: '', montant: '' },
    { date: '', montant: '' },
    { date: '', montant: '' },
    { date: '', montant: '' }
  ];

  get currentBillingDate():string{
    const currentDate=new Date();
  const currentDay=currentDate.getDay();
  const billingDay= Number(this.billingDay);
  if (currentDay>billingDay){
    return `${billingDay}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
  }
  return `${billingDay}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
}

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

  onRibChanged(ribChangedResult: UpdateRibResult) {
    this.ribChanged.emit(ribChangedResult);
    this.showUpdateRibDialog = false;
  }

  onBillingDayChanged(billingDateChanged: boolean): void {
    this.billingDayChanged.emit(billingDateChanged);
    this.showUpdateDateDialog = false;
  }

  openTable() {
    this.showEchtable = true;
  }

}