import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { ContractUpdate } from '../../../../shared/models/contract/contract-update.model';
import { ContractService } from '../../../../shared/services/contract.service';

@Component({
  selector: 'app-documents-contract-billing-date-dialog',
  imports: [FormsModule, ButtonModule, SelectButtonModule],
  templateUrl: './billing-date-dialog.component.html',
  styleUrl: './billing-date-dialog.component.scss'
})
export class AppDocumentsContractBillingDateDialogComponent {

  @Input() contractDetails: ContractDetails | undefined;
   @Output() onCancelClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() billingDayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  newDate: any = '';
  datesDisponibles = [
    { label: '05', value: '05' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' }
  ];

  constructor(private contractService: ContractService) { }

  submitBillingDate(): void {

    if (!this.newDate || !this.datesDisponibles.some(date => date.value === this.newDate)) {
      console.error("Date de prélèvement invalide.");
      return;
    }

    if (!this.contractDetails || !this.contractDetails.BusinessPartnerBankId) {
      console.error("BusinessPartnerBankId non trouvé dans les détails du contrat.");
      return;
    }

    if (!this.datesDisponibles.map(item => item.value).includes(this.newDate)) {
      console.error("Jour de prélèvement invalide. Choisissez parmi 05, 10, 15 ou 20.");
      return;
    }

    const contractUpdateDay: ContractUpdate = {
      ContractISU: this.contractDetails.ContractISU,
      BusinessPartnerBankId: this.contractDetails.BusinessPartnerBankId,
      BillingDay: this.newDate,
      Action: "CHANGE_BANK",
    };

    this.contractService.updateContractDetails(contractUpdateDay).subscribe({
      next: () => {
        this.billingDayChanged.emit(true);
        this.newDate = {};
      },
      error: (error) => {
        this.billingDayChanged.emit(false);
        this.newDate = {};
        console.error("Erreur lors de la mise à jour :", error);
      }
    });
  }
}
