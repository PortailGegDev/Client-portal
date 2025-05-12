import { CommonModule, DatePipe} from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { AppDocumentsContractPaymentMethodeDialogComponent } from '../payment-methode-dialog/payment-methode-dialog.component';
import { BillingService } from '../../../../shared/services/billing.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-documents-contract-payment',
  imports: [AppDocumentsContractRibDialogComponent, AppDocumentsContractBillingDateDialogComponent,AppDocumentsContractPaymentMethodeDialogComponent, CommonModule, FormsModule, SelectButtonModule, InputTextModule, InputNumberModule, DialogModule, CardModule, ButtonModule, TimeSpanToDatePipe, MaskRIBPipe, DropdownModule, TableModule,DatePipe],
  templateUrl: './contract-payment.component.html',
  styleUrl: './contract-payment.component.scss'
})
export class AppDocumentsContractPaymentComponent implements OnChanges  {
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
  @Output() paymentMethodeChanged= new EventEmitter<boolean>();

  showUpdateRibDialog: boolean = false;
  showUpdateDateDialog: boolean = false;
  showUpdatePaymentMethodeDialog: boolean = false;
  showEchtable: boolean = false;
  billingDay: string = '';
  // currentDate: string = formatDateFr(new Date());
  constructor(private billingService: BillingService) {}

  get currentBillingDate():Date{
  const currentDate=new Date();
  const currentDay=currentDate.getDate();
  const billingDay= Number(this.billingDay);
  let billingMonth= currentDate.getMonth();
  let billingYear= currentDate.getFullYear();
  if(currentDay>billingDay){
    billingMonth+=1;
  if(billingMonth>11){
    billingMonth=0;
    billingYear+=1;}
  }
  return new Date(billingYear,billingMonth,billingDay);
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

  onPaymentMethodeChanged(paymentMethodeChangedResult: boolean): void{
    this.paymentMethodeChanged.emit(paymentMethodeChangedResult);
    this.showUpdatePaymentMethodeDialog= false;
  }

  billingItems: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  openTable(): void {
    if (!this.contract?.ContractISU) return;

    this.showEchtable = true;
    this.isLoading = true;
    this.errorMessage = '';
    this.billingItems = [];
    // const testContractISU = '0350003558';
    this.billingService.getPaymentSchedule(this.contract?.ContractISU)
      .pipe(
        switchMap((billingPlanID: string | null) => {
          if (billingPlanID) {
            return this.billingService.getBillingPlanDetails(billingPlanID);
          } else {
            this.errorMessage = 'Aucun échéancier trouvé';
            return ([]);
          }
        })
      )
      .subscribe({
        next: (data) => {
          this.billingItems = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors du chargement de l\'échéancier';
          this.isLoading = false;
        }
      });
  }

 
  
}