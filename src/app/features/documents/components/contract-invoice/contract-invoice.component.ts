import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { PanelModule } from 'primeng/panel';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { ContractService } from '../../../../shared/services/contract.service';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-documents-contract-invoice',
  imports: [CommonModule, FormsModule,TableModule, PanelModule,ButtonModule,DialogModule],
  templateUrl: './contract-invoice.component.html',
  styleUrl: './contract-invoice.component.scss'
})
export class AppDocumentsContractInvoiceComponent {
  @Input() contract: Contract | undefined;
  @Output() addressUpdated = new EventEmitter<{ number: string; street: string; postalCode: string; city: string; }>();

  updateInvoice: boolean = false;
  newStreet: string = '';
  newPostalCode: string = '';
  newCity: string = '';
  newNumber: string = '';
  // @Input() contracts: Signal<Contract[]>;

  // constructor(private contractService: ContractService){
  //   this.contracts = this.contractService.contracts;
  // }

  submitNewAddress(): void {
    if (
      this.newStreet.trim() &&
      this.newPostalCode.trim() &&
      this.newCity.trim() &&
      this.newNumber.trim()
    ) {
      this.addressUpdated.emit({
        number: this.newNumber.trim(),
        street: this.newStreet.trim(),
        postalCode: this.newPostalCode.trim(),
        city: this.newCity.trim()
      });

      this.updateInvoice = false; 
    } else {
      alert("Tous les champs de l'adresse sont obligatoires.");
    }
  }

}
