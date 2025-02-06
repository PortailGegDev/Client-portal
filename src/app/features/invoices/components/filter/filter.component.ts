import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Facture } from '../../../../shared/models/facture-model';
import { Router } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { AppInvoicesEstimateDialogComponent } from '../estimate-dialog/estimate-dialog.component';
import { AppInvoicesEnergyCheckComponent } from '../energy-check/energy-check.component';
@Component({
  selector: 'app-invoices-filter',
  imports: [CommonModule, FormsModule,DatePickerModule,IconField,InputIcon,InputTextModule,Message,Dialog,ButtonModule,TableModule, AppInvoicesEstimateDialogComponent, AppInvoicesEnergyCheckComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class AppInvoicesFilterComponent  {
  @Input() invoices: Facture[] = [];
  @Output() onGlobalFilter: EventEmitter<string>= new EventEmitter<string>();
  invoicesData:  { statut: string; dateprelevemnt:string; DateDemission:string; TotalAmountHT: string; date: string | null } | null = null;
  rangeDates: Date[] | undefined;

  constructor(private router: Router) {}
  EstimateFacture: boolean = false;
  ChequeEnergie: boolean = false;
  showDialog() {
      this.EstimateFacture = true;
  }
  
  showDialog1() {
    this.ChequeEnergie = true;
}

  filterGlobal(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.onGlobalFilter.emit(inputValue); 
  }
}
