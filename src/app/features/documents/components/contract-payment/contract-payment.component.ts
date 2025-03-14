import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-documents-contract-payment',
  imports: [CommonModule,FormsModule,InputNumberModule,DialogModule,CardModule],
  templateUrl: './contract-payment.component.html',
  styleUrl: './contract-payment.component.scss'
})
export class AppDocumentsContractPaymentComponent {
  MettreAJourLeRIB:boolean=false;
  value1: number=1;
  showDialog() {
    this.MettreAJourLeRIB  = true;
}

}
