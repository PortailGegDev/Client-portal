import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Invoice } from '../../../../shared/models/invoice-model';
import { DatePickerModule } from 'primeng/datepicker';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppInvoicesEstimateDialogComponent } from '../estimate-dialog/estimate-dialog.component';
import { AppInvoicesEnergyCheckComponent } from '../energy-check/energy-check.component';
import { PrimeNgLocaleService } from '../../../../shared/services/prime-ng-locale.service';

@Component({
  selector: 'app-invoices-filter',
  imports: [CommonModule, FormsModule, DatePickerModule, IconField, InputIcon, InputTextModule, Message, Dialog, ButtonModule, TableModule, AppInvoicesEstimateDialogComponent, AppInvoicesEnergyCheckComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class AppInvoicesFilterComponent {
  @Input() invoices: Invoice[] = [];
  @Output() onGlobalFilter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDateRangeSelected: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  rangeDates: Date[] | undefined;
  fr: any;
  
  constructor(private primenNgLocaleService: PrimeNgLocaleService) {
    this.fr = this.primenNgLocaleService.getFrenchLocale(); // pour [locale]
  }

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

  onSelectDateRange() {
    this.onDateRangeSelected.emit(this.rangeDates);
  }

  onClearDateRange() {
    this.onDateRangeSelected.emit([]);
  }
}
