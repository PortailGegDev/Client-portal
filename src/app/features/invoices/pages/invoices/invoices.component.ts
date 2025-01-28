import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContractHttpService } from '../../../../core/http-services/contrat-http.service';
import { BrandService } from '../../../../shared/services/brand.service';
import * as moment from 'moment';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../shared/services/contract.service';

import { AppInvoicesFilterComponent } from '../../componants/filter/filter.component';
import { AppInvoicesTableComponent } from '../../componants/table/table.component';
import { Facture } from '../../../../shared/models/facture-model';
import { InvoicesService } from '../../../../shared/services/invoices.service';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule,PanelModule,ActiveContractComponent,AppInvoicesFilterComponent,AppInvoicesTableComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class AppInvoicesComponent {
  constructor(
    private router: Router,
    private contractService: ContractHttpService,
    private contractServicee: ContractService,
    private invoicesService: InvoicesService,
    private brandService: BrandService,
  ) {
    this.contractServicee.contract$.subscribe((data) => {
      this.loadFacture(data.ISUContract);
    });
    
  }

invoices: Facture[] = [];
globalFiltervalue: string='';


  theme: string = '';
  ngOnInit(): void {
    this.theme = this.brandService.getBrand();
  }

  contractts: any[] = [];
  loadFacture(contractId: string): void{
    this.invoices=[];
    this.invoicesService.getInvoices(contractId).subscribe({
      next: (factures:Facture[]) => {
        this.invoices=factures;
        console.log(this.invoices);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error); // Affiche l'erreur dans la console en cas de problème
        this.contractts = []; // Assure que contractts reste vide en cas d'erreur
      }
    });
}
globalFilter(value:string){
this.globalFiltervalue=value;
}
}
