import { Component, effect } from '@angular/core';
import { BrandService } from '../../../../shared/services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../shared/services/contract.service';
import { AppInvoicesFilterComponent } from '../../components/filter/filter.component';
import { AppInvoicesTableComponent } from '../../components/table/table.component';
import { Facture } from '../../../../shared/models/facture-model';
import { InvoicesService } from '../../../../shared/services/invoices.service';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule, PanelModule, ActiveContractComponent, AppInvoicesFilterComponent, AppInvoicesTableComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class AppInvoicesComponent {

  constructor(
    private contractService: ContractService,
    private invoicesService: InvoicesService,
    private brandService: BrandService,
  ) {
    // Effet : Réagir aux changements de selectedContract
    effect(() => {
      const selectedContract = this.contractService.selectedContract();
      if (selectedContract) {
        this.loadFacture(selectedContract.ContractISU);
      }
    });
  }

  invoices: Facture[] = [];
  globalFiltervalue: string = '';


  theme: string = '';

  ngOnInit(): void {
    this.theme = this.brandService.getBrand();
  }

  loadFacture(contractISU: string): void {
    this.invoices = [];

    this.invoicesService.getInvoices(contractISU).subscribe({
      next: (factures: Facture[]) => {
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
}
