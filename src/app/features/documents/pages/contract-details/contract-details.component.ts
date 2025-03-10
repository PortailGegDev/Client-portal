import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ContractService } from '../../../../shared/services/contract.service';
import { Contract } from '../../../../shared/models/contract.model';
import { ContractDetails } from '../../../../shared/models/contract-details.model';

@Component({
  selector: 'app-contract-details',
  imports: [CommonModule,TableModule,ButtonModule],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss',
})
export class AppDocumentContractDetailsComponent {
    contracts: Signal<Contract[]>;
    allContracts: ContractDetails[] = [];
    showContent = false;
    showTable = false;
  constructor(private router: Router,
       private contractService: ContractService) {
      this.contracts = this.contractService.contracts;

    effect(() => {
      debugger
      if (this.contracts()) {
        const contractsISUList = this.contracts().map(item => item.ContractISU);

        this.loadContract(contractsISUList);
      }
    });
  }

    private loadContract(contractsISUList: string[]) {
    this.contractService.getContractsByContractISUList(contractsISUList).subscribe({

      next: (contracts: ContractDetails[]) => {
        this.allContracts = contracts;
        console.log(contracts);
      }
    });
  }

 








  onClickIcon() {
    this.showContent = !this.showContent;
    console.log('showContent:', this.showContent);
  }
  hideContent() {
    this.showContent = false;
    console.log('hideContent triggered');
  }
  showEcheancier = false;
  isHidden = false;

  toggleEcheancier() {
    this.showEcheancier = !this.showEcheancier;
    this.isHidden = !this.isHidden;
  }
  isTableVisible = false;

  toggleTable() {
    this.isTableVisible = !this.isTableVisible;
  }
  closeTable() {
    this.isTableVisible = false;
  }
  RetourEnBack() {
    this.router.navigate(['documents']);
  }
  // facture: Facture = {
  //   dateEmission: '2024-08-06',
  //   factureNumber: '12345',
  //   montant: 100,
  //   statut: 'Payée',
  //   details: 'Détails de la facture',
  // };
  // downloadPDF(facture: Facture) {
  //   const doc = new jsPDF();

  //   doc.text(`Facture N°: ${facture.factureNumber}`, 10, 10);
  //   doc.text(`Date d'émission: ${facture.dateEmission}`, 10, 20);
  //   doc.text(`Montant: ${facture.montant}€`, 10, 30);
  //   doc.text(`Statut: ${facture.statut}`, 10, 40);
  //   doc.text(`Détails: ${facture.details}`, 10, 50);

  //   doc.save(`facture_${facture.factureNumber}.pdf`);

  //   alert(`Téléchargement du PDF pour la facture N° ${facture.factureNumber}`);
  // }
}
