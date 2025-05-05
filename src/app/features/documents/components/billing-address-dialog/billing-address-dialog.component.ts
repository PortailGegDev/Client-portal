import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContractUpdate } from '../../../../shared/models/contract/contract-update.model';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { ContractService } from '../../../../shared/services/contract.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-documents-contract-billing-address-dialog',
  imports: [FormsModule,CommonModule,ButtonModule,InputTextModule,ReactiveFormsModule,InputNumberModule],
  templateUrl: './billing-address-dialog.component.html',
  styleUrl: './billing-address-dialog.component.scss'
})
export class AppDocumentsContractBillingAddressDialogComponent {
  @Input() contractDetails: ContractDetails | undefined;
  @Output() onCancelClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() billingAddressChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  newStreet: string = '';
  newPostalCode: string = '';
  newCity: string = '';
  newNumber: any = '';
  form: FormGroup;

  get numberForm(): any { return this.form.get('number'); }
  get streetForm(): any { return this.form.get('street'); }
  get postalCodeForm(): any { return this.form.get('postalCode'); }
  get cityForm(): any { return this.form.get('city'); }


  constructor(private contractService: ContractService,private formBuilder: FormBuilder)  {
    this.form = this.formBuilder.group({
      number: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      street: ['', Validators.required],
      postalCode: ['',[Validators.required,Validators.pattern(/^\d{5}$/)]],
      city: ['', Validators.required]

    });
  }

    submitBillingAddress(): void {
      const number = this.numberForm?.value;
      const street = this.streetForm?.value;
      const postalCode = this.postalCodeForm?.value;
      const city = this.cityForm?.value;
    
      if (!number || !street || !postalCode || !city) {
        console.error("Tous les champs de l'adresse sont obligatoires.");
        this.billingAddressChanged.emit(false);
        return;
      }
    
      if (!this.contractDetails || !this.contractDetails.ContractISU) {
        console.error("Identifiant de contrat manquant !");
        this.billingAddressChanged.emit(false);
        return;
      }
    
      const contractUpdateAddress: ContractUpdate = {
        ContractISU: this.contractDetails.ContractISU,
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

