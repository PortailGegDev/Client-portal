import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { Mandate } from '../../../../shared/models/mandate.model';
import { MaskRIBPipe } from '../../../../shared/pipe/mask-rib.pipe';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';

@Component({
  selector: 'app-documents-contract-payment',
  imports: [CommonModule, FormsModule, InputNumberModule, DialogModule, CardModule, ButtonModule, TimeSpanToDatePipe, MaskRIBPipe,],
  templateUrl: './contract-payment.component.html',
  styleUrl: './contract-payment.component.scss'
})
export class AppDocumentsContractPaymentComponent {
  @Input() mandates: Mandate[] = [];

  updateRib: boolean = false;
  value1: number = 1;
  
  showDialog() {
    this.updateRib = true;
  }

}
