import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { PanelModule } from 'primeng/panel';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AppDocumentsContractBillingAddressDialogComponent } from '../billing-address-dialog/billing-address-dialog.component';

@Component({
  selector: 'app-documents-contract-invoice',
  imports: [CommonModule, FormsModule,TableModule, PanelModule,ButtonModule,DialogModule,AppDocumentsContractBillingAddressDialogComponent],
  templateUrl: './contract-invoice.component.html',
  styleUrl: './contract-invoice.component.scss'
})
export class AppDocumentsContractInvoiceComponent {
  @Input() contract: Contract | undefined;
  @Input() contractDetails: ContractDetails | undefined;
  @Output() billingAddressChanged = new EventEmitter<boolean>();
  @Output() onCancelClick = new EventEmitter<void>();

  showUpdateAddressDialog: boolean = false;

  onBillingAddressChanged(billingAddressChanged: boolean): void {
    this.billingAddressChanged.emit(billingAddressChanged);
    debugger
    this.showUpdateAddressDialog = false;
  }


}
