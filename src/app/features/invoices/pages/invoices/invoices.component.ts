import { Component } from '@angular/core';
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
    this.contractService.contract$.subscribe((data) => {
      this.loadFacture(data.ContractISU);
    });

  }

  invoices: Facture[] = [];
  globalFiltervalue: string = '';


  theme: string = '';
  
  ngOnInit(): void {
    this.theme = this.brandService.getBrand();
  }

  contractts: any[] = [];
  loadFacture(contractId: string): void {
    this.invoices = [];

    this.invoicesService.getInvoices(contractId).subscribe({
      next: (factures: Facture[]) => {
        this.invoices = factures;
        console.log(this.invoices);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error); // Affiche l'erreur dans la console en cas de problème
        this.contractts = []; // Assure que contractts reste vide en cas d'erreur
      }
    });
  }

  globalFilter(value: string) {
    this.globalFiltervalue = value;
  }
}
