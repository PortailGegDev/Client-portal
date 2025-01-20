import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ContractHttpService } from '../../../../core/http-services/contrat-http.service';
import { FactureService } from '../../../../core/http-services/facture.service';
import { BrandService } from '../../../../core/services/brand.service';
import * as moment from 'moment';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Facture {
  selected?: boolean;
  PostingDate: string;
  StatusInvoicingDocument: string;
  TotalAmount: number;
  NetDueDate: string;
}

@Component({
  selector: 'app-invoices',
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class AppInvoicesComponent {
  constructor(
    private router: Router,
    private contractService: ContractHttpService,
    private factureService: FactureService,
    private brandService: BrandService
  ) {}

  @ViewChild('startPickerInput') startPickerInput: ElementRef | undefined;
  @ViewChild('endPickerInput') endPickerInput: ElementRef | undefined;

  selectedPeriod = {
    startDate: moment,
    endDate: moment,
  };

  currentPage: number = 1;
  itemsPerPage: number = 5;
  onPageChange(page: number) {
    this.currentPage = page;
  }
  paiements = [
    {
      date: '1 Juin 2023',
      numero: 'n° 1234567',
      montant: 100.45,
      status: 'paid',
    },
    {
      date: '2 Juin 2023',
      numero: 'n° 1234568',
      montant: 75.2,
      status: 'paid',
    },
    {
      date: '3 Juin 2023',
      numero: 'n° 1234569',
      montant: 120.75,
      status: 'pending',
    },
    {
      date: '4 Juin 2023',
      numero: 'n° 1234570',
      montant: 90.0,
      status: 'paid',
    },
    {
      date: '5 Juin 2023',
      numero: 'n° 1234571',
      montant: 110.5,
      status: 'paid',
    },
    {
      date: '6 Juin 2023',
      numero: 'n° 1234572',
      montant: 85.3,
      status: 'pending',
    },
  ];
  downloadPDF(facture: Facture) {
    const doc = new jsPDF();
    doc.text(`Facture N°: ${facture.StatusInvoicingDocument}`, 10, 10);
    doc.text(`Date d'émission: ${facture.PostingDate}`, 10, 20);
    doc.text(`Montant: ${facture.TotalAmount}€`, 10, 30);
    doc.text(`Statut: ${facture.StatusInvoicingDocument}`, 10, 40);
    doc.text(`Détails: ${facture.NetDueDate}`, 10, 50);
    doc.save(`facture_${facture.StatusInvoicingDocument}.pdf`);
    alert(
      `Téléchargement du PDF pour la facture  ${facture.StatusInvoicingDocument}`
    );
  }

  payFacture(facture: Facture) {
    // Logic for paying the facture
    alert(`Paiement de la facture ${facture.StatusInvoicingDocument}`);
  }

  getStatusClass(statut: string): { [key: string]: boolean } {
    return {
      'statut-rectangle': true,
      'statut-a-venir': statut === 'Partiellement soldée',
      'statut-a-regler': statut === 'Non Soldée',
      'statut-reglee': statut === 'Totalement Soldée',
    };
  }

  loadContracts() {
    const accountId = '000001559469';
    /* this.contractService.getContracts(accountId).subscribe( */
    this.contractService.getContracts().subscribe(
      (data) => {
        this.contractts = data.results;
        console.log('>>>>>>>>>>> list of contracts: ', this.contractts);
      },
      (error) => {
        console.error('Erreur lors de la récupération des contrats', error);
      }
    );
  }
  get contractCount(): number {
    return this.contractts.length;
  }
  // contracts = [
  //   { value: 'contract1', address: '16 rue Pierre Larousse, 75014 Paris   |', details: 'Electricite, n° 1456378' },
  //   { value: 'contract2', address: '3 rue Pierre Larousse, 4900 Angers    |', details: 'Electricite, n° 1456378' },
  // ];

  // selectedAddress: string;
  // selectedDetails: string;
  // isOpen: boolean = false;
  // selectContract(contract: any) {
  //   this.selectedAddress = contract.address; // Mettre à jour l'adresse sélectionnée
  //   this.selectedDetails = contract.details; // Mettre à jour les détails sélectionnés
  //   this.isOpen = false; // Fermer le menu après la sélection
  // }

  toggleDropdown() {
    this.isOpen = !this.isOpen; // Alterner l'état du menu déroulant
  }

  startDate: Date = new Date();
  endDate: Date = new Date();
  isDateSelected: boolean = false; // Nouvelle variable d'état
  monthNames: string[] = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  getFormattedDate(): string {
    const startMonth = this.monthNames[this.startDate.getMonth()];
    const endMonth = this.monthNames[this.endDate.getMonth()];
    return `${startMonth} ${this.startDate.getFullYear()} - ${endMonth} ${this.endDate.getFullYear()}`;
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.startDate = new Date(input.value);
    this.updateEndDate(); // Mise à jour de la date de fin si nécessaire
    this.checkDateSelection();
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.endDate = new Date(input.value);
    this.checkDateSelection();
  }

  checkDateSelection(): void {
    this.isDateSelected = this.startDate && this.endDate ? true : false;
  }

  goToPrevDate(): void {
    // Décrémenter d'un mois
    this.startDate.setMonth(this.startDate.getMonth() - 1);
    this.endDate.setMonth(this.endDate.getMonth() - 1);
    this.checkDateSelection();
  }

  goToNextDate(): void {
    // Incrémenter d'un mois
    this.startDate.setMonth(this.startDate.getMonth() + 1);
    this.endDate.setMonth(this.endDate.getMonth() + 1);
    this.checkDateSelection();
  }

  // Mise à jour de la date de fin si elle est inférieure à la date de début
  updateEndDate(): void {
    if (this.endDate < this.startDate) {
      this.endDate = new Date(this.startDate);
      this.endDate.setMonth(this.endDate.getMonth() + 5); // Exemple : 5 mois après la date de début
    }
  }
  currentDate: Date = new Date(); // Initialise la date actuelle
  incrementEndMonth() {
    // Incrémente le mois de la date de fin
    this.endDate.setMonth(this.endDate.getMonth() + 1);
  }

  decrementStartMonth() {
    // Décrémente le mois de la date de début
    this.startDate.setMonth(this.startDate.getMonth() + 1);
  }

  searchText: string = '';
  heroes: any[] = []; // Tableau pour stocker les factures
  selectedFacture: any | null = null; // Facture sélectionnée
  theme: string = '';
  ngOnInit(): void {
    this.fetchFactures(); // Récupère les factures au démarrage
    this.theme = this.brandService.getBrand();
    this.selectedContract = this.contractts[0];
    this.fetchContracts();
  }

  fetchFactures(): void {
    this.factureService.fetchFactures().subscribe(
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

  convertSAPDate(sapDate: string): string | null {
    if (!sapDate || typeof sapDate !== 'string') {
      console.warn('Date invalide:', sapDate);
      return null;
    }

    const match = /\/Date\((\d+)\)\//.exec(sapDate);
    if (!match || match.length < 2) {
      console.warn('Format de date non reconnu:', sapDate);
      return null;
    }

    const timestamp = parseInt(match[1], 10);
    const date = new Date(timestamp);

    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  }

  currentSortColumn: string = ''; // Colonne courante pour le tri
  isAscending: boolean = true;
  // Méthode générique pour trier
  sortBy(property: string, parser: (x: any) => any = (x) => x): void {
    // Vérifie si la colonne courante est celle que l'on veut trier
    if (this.currentSortColumn === property) {
      this.isAscending = !this.isAscending; // Inverser l'ordre de tri si la colonne est déjà triée
    } else {
      this.currentSortColumn = property; // Changer la colonne courante
      this.isAscending = true; // Réinitialiser à l'ascendant pour une nouvelle colonne
    }
    this.heroes.sort((a, b) => {
      const valueA = parser(a[property]);
      const valueB = parser(b[property]);

      // Comparaison
      if (valueA < valueB) return this.isAscending ? -1 : 1;
      if (valueA > valueB) return this.isAscending ? 1 : -1;
      return 0;
    });
  }

  // Méthode pour trier par date d'émission
  sortByDate(): void {
    this.sortBy('PostingDate', this.convertSAPDate);
  }
  // Méthode pour trier par numéro de facture
  sortByFacture(): void {
    this.sortBy('UtilitiesInvoicingDocument', (x) => x.toLowerCase());
  }
  // Méthode pour trier par montant
  sortByMontant(): void {
    this.sortBy('TotalAmount', (x) =>
      parseFloat(x.replace('€', '').replace(',', '.'))
    );
  }
  // Méthode pour trier par statut
  sortByStatut(): void {
    this.sortBy('StatusInvoicingDocument', (x) => x.toLowerCase());
  }

  // Méthode pour convertir les dates françaises en objets Date
  parseDate(dateStr: string): Date {
    const [day, monthName, year] = dateStr.split(' ');
    const months = {
      Janvier: 0,
      Février: 1,
      Mars: 2,
      Avril: 3,
      Mai: 4,
      Juin: 5,
      Juillet: 6,
      Août: 7,
      Septembre: 8,
      Octobre: 9,
      Novembre: 10,
      Décembre: 11,
    };
    // const month = months[monthName];
    const month = months[monthName as keyof typeof months];
    return new Date(parseInt(year), month, parseInt(day));
  }

  // Getter pour les héros filtrés
  get filteredHeroes() {
    if (!this.searchText) {
      return this.heroes;
    }
    const searchTextLower = this.searchText.toLowerCase();
    return this.heroes.filter((hero) =>
      [
        'PostingDate',
        'StatusInvoicingDocument',
        'TotalAmount',
        'UtilitiesInvoicingDocument',
      ].some((key) => {
        if (key === 'PostingDate' && hero[key]) {
          return this.convertSAPDate(hero[key])
            ?.toLowerCase()
            .includes(searchTextLower);
        }
        return (
          hero[key] &&
          hero[key].toString().toLowerCase().includes(searchTextLower)
        );
      })
    );
  }
  getStatutDetails(hero: any): string {
    if (hero.StatusInvoicingDocument === 'Partiellement soldée') {
      return `<span class="prelevement-a-venir">Prélèvement le${this.convertSAPDate(
        hero.NetDueDate
      )}</span>`;
    } else if (hero.StatusInvoicingDocument === 'Non Soldée') {
      return `<span class="montant">${
        hero.TotalUnpaidTTC
      }€</span>  <span class="date">avant le</span> <span class="date">${this.convertSAPDate(
        hero.NetDueDate
      )}</span>`;
    } else if (hero.StatusInvoicingDocument === 'Totalement Soldée') {
      return `<span class="prelevement-a-venir">Prélèvement le ${this.convertSAPDate(
        hero.NetDueDate
      )}</span>`;
    }
    return '';
  }

  get totalPages(): number {
    return Math.ceil(this.filteredHeroes.length / this.itemsPerPage);
  }

  // Obtenir les éléments à afficher pour la page actuelle
  get paginatedHeroes(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredHeroes.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  // Méthode pour changer de page
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  getPagesArray(): number[] {
    const pages = [];
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    // Toujours afficher la première page
    pages.push(1);
    // Ajouter les pages autour de la page actuelle
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);
    // Si l'on est proche du début
    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages - 1);
    }
    // Si l'on est proche de la fin
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 2);
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    // Toujours afficher la dernière page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  }

  // Dans votre composant TypeScript
  selectedInvoiceCount(): number {
    return this.heroes.filter((hero) => hero.selected).length; // Compte le nombre de factures sélectionnées
  }
  selectedCount: number = 0; // Compteur pour les factures sélectionnées
  iconeSelectionnee: boolean = false; // Propriété pour l'état de l'icône

  // Méthode pour cocher ou décocher toutes les factures
  toggleAllSelection(event: any) {
    const isChecked = event.target.checked;
    this.heroes.forEach((hero) => {
      hero.selected = isChecked; // Change l'état de sélection de chaque héros
    });

    this.iconeSelectionnee = isChecked; // Met à jour l'état de l'icône
    this.updateSelectedCount(); // Met à jour le comptage
  }

  toggleCheckbox(hero: any) {
    hero.selected = !hero.selected; // Inverse l'état de la case à cocher
    this.updateSelectedCount(); // Met à jour le compteur

    // Vérifie si toutes les factures sont sélectionnées
    this.iconeSelectionnee = this.heroes.every((h) => h.selected);
  }
  updateSelectedCount() {
    this.selectedCount = this.heroes.filter((hero) => hero.selected).length;
  }
  annuler() {
    // Réinitialiser tous les héros à non sélectionnés
    this.heroes.forEach((hero) => {
      hero.selected = false; // Décocher chaque héros
    });

    this.iconeSelectionnee = false; // Réinitialiser l'état de l'icône
    this.selectedCount = 0; // Réinitialiser le compteur
    console.log('Annuler cliqué');
  }

  downloadSelectedPDFs() {
    const selectedFactures = this.heroes.filter((facture) => facture.selected);
    if (selectedFactures.length === 0) {
      alert('Veuillez sélectionner au moins une facture à télécharger.');
      return;
    }

    selectedFactures.forEach((facture) => {
      const doc = new jsPDF();
      doc.text(`Facture N°: ${facture.UtilitiesInvoicingDocument}`, 10, 10);
      doc.text(`Date d'émission: ${facture.PostingDate}`, 10, 20);
      doc.text(`Montant: ${facture.TotalAmount}`, 10, 30);
      doc.text(`Statut: ${facture.StatusInvoicingDocument}`, 10, 40);
      doc.text(`Détails: ${facture.NetDueDate}`, 10, 50);
      doc.save(`facture_${facture.UtilitiesInvoicingDocument}.pdf`);
    });

    alert('Téléchargement des PDF pour les factures sélectionnées.');
  }
  isTableVisible = false;
  isEstimateVisible = false; // Pour le deuxième overlay

  toggleTable() {
    this.isTableVisible = !this.isTableVisible;
  }
  closeTable() {
    this.isTableVisible = false;
  }
  toggleEstimate() {
    this.isEstimateVisible = !this.isEstimateVisible;
  }

  closeEstimate() {
    this.isEstimateVisible = false;
  }

  selectedContract: any = null;
  addressCompteur: string = '';
  businessSectorText: string = '';
  isOpen: boolean = false;
  selectContract(contract: any) {
    this.addressCompteur = contract.AddressCompteur; // Mettre à jour l'adresse sélectionnée
    this.businessSectorText = contract.BusinessSectorText; // Mettre à jour les détails sélectionnés
    this.isOpen = false;
    this.selectedContract = contract;
  }

  contractts: any[] = [];
  fetchContracts(): void {
    this.contractService.fetchContractISU(null).subscribe(
      (data) => {
        console.log('Données reçues:', data); // Affiche les données reçues dans la console
        if (data?.d?.results) {
          this.contractts = data.d.results; // Récupère le tableau de résultats
          console.log(this.businessSectorText);
          if (this.contractts.length > 0) {
            this.selectedContract = this.contractts[0]; // Le premier contrat sera sélectionné par défaut
          }
        } else {
          console.error('Aucune donnée trouvée.');
          this.contractts = []; // Assure que contractts est un tableau vide si aucune donnée n'est trouvée
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des données:', error); // Affiche l'erreur dans la console en cas de problème
        this.contractts = []; // Assure que contractts reste vide en cas d'erreur
      }
    );
  }

  hpItems: number[] = [0, 0, 0, 0, 0]; // Maintenant 5 éléments pour HP
  hcItems: number[] = [0, 0, 0, 0, 0]; // Maintenant 5 éléments pour HC
  estimatedAmount: number | null = null; // Montant estimé
  isCalculated: boolean = false; // Indicateur pour afficher ou non le montant estimé
  // Méthode pour mettre à jour les valeurs HP et HC
  updateValue(type: string, index: any, value: number): void {
    if (type === 'hp') {
      this.hpItems[index] = value;
    } else if (type === 'hc') {
      this.hcItems[index] = value;
    }
  }

  // Méthode pour calculer l'estimation
  calculateEstimate(): void {
    const totalHp = this.hpItems.reduce((acc, value) => acc + value, 0);
    const totalHc = this.hcItems.reduce((acc, value) => acc + value, 0);

    // Exemple de calcul
    this.estimatedAmount = (totalHp + totalHc) * 0.85; // Exemple de logique de calcul
    this.isCalculated = true; // Marque que le calcul est terminé
  }
}
