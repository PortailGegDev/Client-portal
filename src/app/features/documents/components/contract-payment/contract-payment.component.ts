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
import { ContractDetails } from '../../../../shared/models/contract-details.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-documents-contract-payment',
  imports: [CommonModule, FormsModule, InputTextModule,InputNumberModule, DialogModule, CardModule, ButtonModule, TimeSpanToDatePipe, MaskRIBPipe,],
  templateUrl: './contract-payment.component.html',
  styleUrl: './contract-payment.component.scss'
})
export class AppDocumentsContractPaymentComponent {
  @Input() mandates: Mandate[] = [];
  @Input() ContractDetails: ContractDetails | undefined;
  @Output() ribUpdated: EventEmitter<string> = new EventEmitter<string>();

  updateRib: boolean = false;
  newRib: any = '';  // Variable pour stocker le nouveau RIB

  // Méthode pour valider et émettre l'événement de mise à jour du RIB
  submitNewRib(): void {
    if (this.newRib && this.newRib.trim() !== '') {
      this.ribUpdated.emit(this.newRib);
    } else {
      alert("Le RIB ne peut pas être vide.");
    }
  }
}