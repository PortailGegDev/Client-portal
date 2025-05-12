import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { ContractService } from '../../../../shared/services/contract.service';
import { ContractUpdate } from '../../../../shared/models/contract/contract-update.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-documents-contract-payment-methode-dialog',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, InputTextModule,ButtonModule],
  templateUrl: './payment-methode-dialog.component.html',
  styleUrl: './payment-methode-dialog.component.scss'
})
export class AppDocumentsContractPaymentMethodeDialogComponent {
  @Input() contractDetails: ContractDetails | undefined;
  @Output() onCancelClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() paymentMethodeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  paymentMethod: string='';
  paymenyProcedure: string='';
  form: FormGroup;

  get paymentMethodForm(): any { return this.form.get('paymentMethod'); }
  get paymentProcedureForm(): any { return this.form.get('paymentProcedure'); }

  constructor(private contractService: ContractService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      paymentProcedure: ['', Validators.required]
    });
  }

  submitNewPaymentMethode(): void {
    const paymentMethod = this.paymentMethodForm?.value;
    const paymentProcedure = this.paymentProcedureForm?.value;

    if (!paymentMethod || !paymentProcedure) {
      console.error("Tous les champs sont obligatoires.");
      this.paymentMethodeChanged.emit(false);
      return;
    }

    if (!this.contractDetails || !this.contractDetails.ContractISU) {
      console.error("Identifiant de contrat manquant !");
      this.paymentMethodeChanged.emit(false);
      return;
    }

    const contractUpdateAddress: ContractUpdate = {
      ContractISU: this.contractDetails.ContractISU,
      PaymentMethod: paymentMethod,
      PaymentProcedure: paymentProcedure,
      Action: "", // il faut changer l'action pour changer le payment methode
    };

    this.contractService.updateContractDetails(contractUpdateAddress).subscribe({
      next: () => {
        this.paymentMethodeChanged.emit(true);
      },
      error: (error) => {
        this.paymentMethodeChanged.emit(false);
        console.error("Erreur lors de la mise à jour :", error);
      }
    });
  }
}

