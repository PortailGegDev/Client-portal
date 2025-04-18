import { Component, effect } from '@angular/core';
import { BrandService } from '../../../../shared/services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../shared/services/contract.service';
import { AppInvoicesFilterComponent } from '../../components/filter/filter.component';
import { AppInvoicesTableComponent } from '../../components/table/table.component';
import { Invoice } from '../../../../shared/models/invoice-model';
import { InvoicesService } from '../../services/invoices.service';
import { PanelModule } from 'primeng/panel';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { environment } from '../../../../../environments/environment.prod';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule, PanelModule, ActiveContractComponent, AppInvoicesFilterComponent, AppInvoicesTableComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class AppInvoicesComponent {

  selectedContract: Contract | null = null;

  constructor(
    private contractService: ContractService,
    private invoicesService: InvoicesService,
    private brandService: BrandService,
  ) {
    // Effet : Réagir aux changements de selectedContract
    effect(() => {
      this.selectedContract = this.contractService.selectedContract();
      if (this.selectedContract) {
        this.loadInvoices(this.selectedContract.ContractISU);
      }
    });
  }

  invoices: Invoice[] = [];
  globalFiltervalue: string = '';


  theme: string = '';

  ngOnInit(): void {
    this.theme = this.brandService.getBrand();
  }

  private loadInvoices(contractISU: string): void {
    this.invoicesService.getInvoices(contractISU).subscribe({
      next: (factures: Invoice[]) => {
        this.invoices = factures;
        console.log(this.invoices);

        // TODO : à supprimer après la finalisation de paiement en ligne
        this.invoices.push({
          PostingDate: '/Date(1741478400000)/',
          PeriodEndDate: '/Date(1714003200000)',
          PeriodStartDate: '/Date(1721779200000)/',
          NetDueDate: '/Date(1741478400000)/',
          NetDueYear: 2025,
          UtilitiesInvoicingDocument: `2025032500002 (il s'agit d'une facture de test)`,
          TotalAmount: 2000.00,
          TotalAmountHT: 1900.00,
          TotalCurrency: 'EUR',
          TotalPaidTTC: 0.00,
          TotalUnpaidTTC: 2000.00,
          StatusInvoicingDocument: 'Non Soldée',
          TotalUnpaidHT: 0.00,
          Canceled: '0',
          Energy: '01',
          FactureType: 'Souscription ou ajustement manuelle',
          ISUContract: '0350153099',
          PaymentMethod: '',
          Quantity: 0,
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error); // Affiche l'erreur dans la console en cas de problème
        this.invoices = [];
      }
    });
  }

  private filterInvoicesByDates(contractISU: string, startDate: Date, endDate: Date): void {
    this.invoicesService.filterInvoicesByDates(contractISU, startDate, endDate).subscribe({
      next: (factures: Invoice[]) => {
        this.invoices = factures;
        console.log(this.invoices);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error); // Affiche l'erreur dans la console en cas de problème
        this.invoices = [];
      }
    });
  }

  globalFilter(value: string) {
    this.globalFiltervalue = value;
  }

  filterInvoicesByDateRange(dateRange: Date[]) {
    if (dateRange.length === 0 || (dateRange[0] === null || dateRange[1] === null)) {
      this.loadInvoices(this.selectedContract!.ContractISU);
      return;
    }

    this.filterInvoicesByDates(this.selectedContract!.ContractISU, dateRange[0], dateRange[1]);
  }
}