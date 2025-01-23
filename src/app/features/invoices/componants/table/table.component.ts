import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import { Facture } from '../../../../shared/models/facture-model';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { convertSAPDate } from '../../../../shared/utils/date-utilities';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
interface Facturee {
  selected?: boolean;
  PostingDate: string;
  StatusInvoicingDocument: string;
  TotalAmount: number;
  NetDueDate: string;
}


@Component({
  selector: 'app-invoices-table',
  imports: [CommonModule,TimeSpanToDatePipe,FormsModule,ButtonModule,TableModule,TagModule,ConfirmDialogModule,InputIconModule,IconFieldModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class AppInvoicesTableComponent implements OnChanges {
@Input() invoices:Facture[]=[];
ngOnChanges(changes: SimpleChanges): void {
  if (this.invoices.length >0)
  {
    console.log(this.invoices);
  }
}

selectedInvoices:Facture[]=[];
  searchText: string = '';
  selectedFacture: any | null = null; 

  getSeverity(status: string) {
    switch (status) {
        case 'INSTOCK':
            return 'success';
        case 'LOWSTOCK':
            return 'warn';
        case 'OUTOFSTOCK':
            return 'danger';
    }
    return undefined;
  }
  
  filterGlobal(event: Event, dt: Table) {
    const inputValue = (event.target as HTMLInputElement).value;
    dt.filterGlobal(inputValue, 'contains');
  }
  currentSortColumn: string = ''; // Colonne courante pour le tri
  isAscending: boolean = true;
  // Méthode générique pour trier
  // sortBy(property: string, parser: (x: any) => any = (x) => x): void {
  //   // Vérifie si la colonne courante est celle que l'on veut trier
  //   if (this.currentSortColumn === property) {
  //     this.isAscending = !this.isAscending; // Inverser l'ordre de tri si la colonne est déjà triée
  //   } else {
  //     this.currentSortColumn = property; // Changer la colonne courante
  //     this.isAscending = true; // Réinitialiser à l'ascendant pour une nouvelle colonne
  //   }
  //   this.invoices.sort((a, b) => {
  //     const valueA = parser(a[property]);
  //     const valueB = parser(b[property]);

  //     // Comparaison
  //     if (valueA < valueB) return this.isAscending ? -1 : 1;
  //     if (valueA > valueB) return this.isAscending ? 1 : -1;
  //     return 0;
  //   });
  // }

  // Méthode pour trier par date d'émission
  // sortByDate(): void {
  //   this.sortBy('PostingDate', this.convertSAPDate);
  // }

  // Méthode pour trier par montant
  // sortByMontant(): void {
  //   this.sortBy('TotalAmount', (x) =>
  //     parseFloat(x.replace('€', '').replace(',', '.'))
  //   );
  // }
  // // Méthode pour trier par statut
  // sortByStatut(): void {
  //   this.sortBy('StatusInvoicingDocument', (x) => x.toLowerCase());
  // }

  currentPage: number = 1;
  itemsPerPage: number = 5;
  onPageChange(page: number) {
    this.currentPage = page;
  }
   // Obtenir les éléments à afficher pour la page actuelle
  //  get paginatedHeroes(): any[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.filteredHeroes.slice(
  //     startIndex,
  //     startIndex + this.itemsPerPage
  //   );
  // }
  // get totalPages(): number {
  //   return Math.ceil(this.filteredHeroes.length / this.itemsPerPage);
  // }
 // Getter pour les héros filtrés
//  get filteredHeroes() {
//   if (!this.searchText) {
//     return this.invoices;
//   }
//   const searchTextLower = this.searchText.toLowerCase();
//   return this.invoices.filter((hero) =>
//     [
//       'PostingDate',
//       'StatusInvoicingDocument',
//       'TotalAmount',
//       'UtilitiesInvoicingDocument',
//     ].some((key) => {
//       if (key === 'PostingDate' && hero[key]) {
//         return this.convertSAPDate(hero[key])
//           ?.toLowerCase()
//           .includes(searchTextLower);
//       }
//       return (
//         hero[key] &&
//         hero[key].toString().toLowerCase().includes(searchTextLower)
//       );
//     })
//   );
// }
  // Méthode pour changer de page
  // changePage(page: number): void {
  //   if (page < 1 || page > this.totalPages) return;
  //   this.currentPage = page;
  // }

  // getPagesArray(): number[] {
  //   const pages = [];
  //   const totalPages = this.totalPages;
  //   const currentPage = this.currentPage;
  //   // Toujours afficher la première page
  //   pages.push(1);
  //   // Ajouter les pages autour de la page actuelle
  //   let startPage = Math.max(2, currentPage - 2);
  //   let endPage = Math.min(totalPages - 1, currentPage + 2);
  //   // Si l'on est proche du début
  //   if (currentPage <= 3) {
  //     endPage = Math.min(5, totalPages - 1);
  //   }
  //   // Si l'on est proche de la fin
  //   if (currentPage >= totalPages - 2) {
  //     startPage = Math.max(totalPages - 4, 2);
  //   }
  //   for (let i = startPage; i <= endPage; i++) {
  //     pages.push(i);
  //   }
  //   // Toujours afficher la dernière page
  //   if (totalPages > 1) {
  //     pages.push(totalPages);
  //   }
  //   return pages;
  // }


   // Méthode pour cocher ou décocher toutes les factures
  //  toggleAllSelection(event: any) {
  //   const isChecked = event.target.checked;
  //   this.invoices.forEach((hero) => {
  //     hero.selected = isChecked; // Change l'état de sélection de chaque héros
  //   });

  //   this.iconeSelectionnee = isChecked; // Met à jour l'état de l'icône
  //   this.updateSelectedCount(); // Met à jour le comptage
  // }


  // Dans votre composant TypeScript
  // selectedInvoiceCount(): number {
  //   return this.invoices.filter((hero) => hero.selected).length; // Compte le nombre de factures sélectionnées
  // }
  selectedCount: number = 0; // Compteur pour les factures sélectionnées
  iconeSelectionnee: boolean = false; // Propriété pour l'état de l'icône

 
  // toggleCheckbox(hero: any) {
  //   hero.selected = !hero.selected; // Inverse l'état de la case à cocher
  //   this.updateSelectedCount(); // Met à jour le compteur

  //   // Vérifie si toutes les factures sont sélectionnées
  //   this.iconeSelectionnee = this.invoices.every((h) => h.selected);
  // }
  // updateSelectedCount() {
  //   this.selectedCount = this.invoices.filter((hero) => hero.selected).length;
  // }
  // annuler() {
  //   // Réinitialiser tous les héros à non sélectionnés
  //   this.invoices.forEach((hero) => {
  //     hero.selected = false; // Décocher chaque héros
  //   });

  //   this.iconeSelectionnee = false; // Réinitialiser l'état de l'icône
  //   this.selectedCount = 0; // Réinitialiser le compteur
  //   console.log('Annuler cliqué');
  // }

 


  // downloadSelectedPDFs() {
  //   const selectedFactures = this.invoices.filter((facture) => facture.selected);
  //   if (selectedFactures.length === 0) {
  //     alert('Veuillez sélectionner au moins une facture à télécharger.');
  //     return;
  //   }
  //   selectedFactures.forEach((facture) => {
  //     const doc = new jsPDF();
  //     doc.text(`Facture N°: ${facture.utilitiesInvoicingDocument}`, 10, 10);
  //     doc.text(`Date d'émission: ${facture.postingDate}`, 10, 20);
  //     doc.text(`Montant: ${facture.totalAmount}`, 10, 30);
  //     doc.text(`Statut: ${facture.statusInvoicingDocument}`, 10, 40);
  //     doc.text(`Détails: ${facture.netDueDate}`, 10, 50);
  //     doc.save(`facture_${facture.utilitiesInvoicingDocument}.pdf`);
  //   });

  //   alert('Téléchargement des PDF pour les factures sélectionnées.');
  // }

  getStatutDetails(hero: any): string {
    if (hero.StatusInvoicingDocument === 'Partiellement soldée') {
      return `<span class="prelevement-a-venir">Prélèvement le${convertSAPDate(
        hero.NetDueDate
      )}</span>`;
    } else if (hero.StatusInvoicingDocument === 'Non Soldée') {
      return `<span class="montant">${
        hero.TotalUnpaidTTC
      }€</span>  <span class="date">avant le</span> <span class="date">${convertSAPDate(
        hero.NetDueDate
      )}</span>`;
    } else if (hero.StatusInvoicingDocument === 'Totalement Soldée') {
      return `<span class="prelevement-a-venir">Prélèvement le ${convertSAPDate(
        hero.NetDueDate
      )}</span>`;
    }
    return '';
  }
  getStatusClass(statut: string): { [key: string]: boolean } {
    return {
      'statut-rectangle': true,
      'statut-a-venir': statut === 'Partiellement soldée',
      'statut-a-regler': statut === 'Non Soldée',
      'statut-reglee': statut === 'Totalement Soldée',
    };
  }

  // downloadPDF(facture: Facture) {
  //   const doc = new jsPDF();
  //   doc.text(`Facture N°: ${facture.StatusInvoicingDocument}`, 10, 10);
  //   doc.text(`Date d'émission: ${facture.PostingDate}`, 10, 20);
  //   doc.text(`Montant: ${facture.TotalAmount}€`, 10, 30);
  //   doc.text(`Statut: ${facture.StatusInvoicingDocument}`, 10, 40);
  //   doc.text(`Détails: ${facture.NetDueDate}`, 10, 50);
  //   doc.save(`facture_${facture.StatusInvoicingDocument}.pdf`);
  //   alert(
  //     `Téléchargement du PDF pour la facture  ${facture.StatusInvoicingDocument}`
  //   );
  // }

  payFacture(facture: Facture) {

  }

  // sortByFacture(): void {
  //   this.sortBy('utilitiesInvoicingDocument', (x) => x.toLowerCase());
  // }
}
