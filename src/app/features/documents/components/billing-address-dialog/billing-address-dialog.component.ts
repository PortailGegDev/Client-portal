import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContractUpdate } from '../../../../shared/models/contract/contract-update.model';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { ContractService } from '../../../../shared/services/contract.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-documents-contract-billing-address-dialog',
  imports: [FormsModule,CommonModule,ButtonModule,InputTextModule],
  templateUrl: './billing-address-dialog.component.html',
  styleUrl: './billing-address-dialog.component.scss'
})
export class AppDocumentsContractBillingAddressDialogComponent {
  @Input() contractDetails: ContractDetails | undefined;
  @Input() contract: Contract | undefined;

  @Output() onCancelClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() billingAddressChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  newStreet: string = '';
  newPostalCode: string = '';
  newCity: string = '';
  newNumber: string = '';
    constructor(private contractService: ContractService) { }

    ngOnInit(): void {
      console.log('Contract reçu :', this.contract);
    }
    

    submitBillingAddress(): void {
      const number = this.newNumber?.trim();
      const street = this.newStreet?.trim();
      const postalCode = this.newPostalCode?.trim();
      const city = this.newCity?.trim();
    
      if (!number || !street || !postalCode || !city) {
        console.error("Tous les champs de l'adresse sont obligatoires.");
        this.billingAddressChanged.emit(false);
        return;
      }
    
      if (!this.contract || !this.contract.ContractISU) {
        console.error("Identifiant de contrat manquant !");
        this.billingAddressChanged.emit(false);
        return;
      }
    
      const contractUpdateAddress: ContractUpdate = {
        ContractISU: this.contract.ContractISU,
        HouseNumber: number,
        StreetName: street,
        PostalCode: postalCode,
        CityName: city,
        Action: "CHANGE_BILLING_ADDR",
      };
    
      this.contractService.updateContractDetails(contractUpdateAddress).subscribe({
        next: () => {
          this.billingAddressChanged.emit(true);
        },
        error: (error) => {
          this.billingAddressChanged.emit(false);
          console.error("Erreur lors de la mise à jour :", error);
        }
      });
    }
  }    

