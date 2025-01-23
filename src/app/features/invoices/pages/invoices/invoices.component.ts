import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContractHttpService } from '../../../../core/http-services/contrat-http.service';
import { FactureService } from '../../../../core/http-services/facture.service';
import { BrandService } from '../../../../shared/services/brand.service';
import * as moment from 'moment';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../shared/services/contract.service';

import { AppInvoicesFilterComponent } from '../../componants/filter/filter.component';
import { AppInvoicesTableComponent } from '../../componants/table/table.component';

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule,ActiveContractComponent,AppInvoicesFilterComponent,AppInvoicesTableComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class AppInvoicesComponent {
  constructor(
    private router: Router,
    private contractService: ContractHttpService,
    private contractServicee: ContractService,
    private factureService: FactureService,
    private brandService: BrandService,
  ) {
    this.contractServicee.contract$.subscribe((data) => {
      this.loadFacture(data.ISUContract);
    });
    
  }

  heroes: any[] = [];
  theme: string = '';
  ngOnInit(): void {
    this.theme = this.brandService.getBrand();
  }

  fetchFactures(): void {
    this.factureService.fetchFactures(null).subscribe(
      (data) => {
        console.log('Données reçues:', data);
        if (data?.d?.results) {
          this.heroes = data.d.results; // Convertit l'objet unique en tableau
        } else {
          console.error('Aucune donnée trouvée.');
          this.heroes = [];
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }
  contractts: any[] = [];
  loadFacture(contractId: string): void{
    this.heroes=[];
    this.factureService.fetchFactures(contractId).subscribe({
      next: (response) => {
        const factures = response.d.results;
        this.heroes=factures;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données:', error); // Affiche l'erreur dans la console en cas de problème
        this.contractts = []; // Assure que contractts reste vide en cas d'erreur
      }
    });
}}
