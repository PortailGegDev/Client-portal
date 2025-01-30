import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
@Component({
  selector: 'app-invoices-filter',
  imports: [CommonModule, FormsModule,DatePickerModule,IconField,InputIcon,InputTextModule,Message,Dialog,ButtonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class AppInvoicesFilterComponent implements OnChanges {
  @Input() invoices: Facture[] = [];
  @Output() onGlobalFilter: EventEmitter<string>= new EventEmitter<string>();
  invoicesData:  { statut: string; dateprelevemnt:string; DateDemission:string; TotalAmountHT: string; date: string | null } | null = null;
  rangeDates: Date[] | undefined;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {

  }

  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  searchText: string = '';
  heroes: any[] = []; 
  isDateSelected: boolean = false; // Nouvelle variable d'état
  startDate: Date = new Date();
  endDate: Date = new Date();
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
  decrementStartMonth() {
    this.startDate.setMonth(this.startDate.getMonth() + 1);
  }
  currentDate: Date = new Date();
  incrementEndMonth() {
    this.endDate.setMonth(this.endDate.getMonth() + 1);
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
  getStatutDetails(hero: any): string {
    if (hero.StatusInvoicingDocument === 'Partiellement soldée') {
      return `<span class="prelevement-a-venir">Prélèvement le${this.convertSAPDate(hero.NetDueDate)}</span>`;
    } else if (hero.StatusInvoicingDocument === 'Non Soldée') {
      return `<span class="montant">${hero.TotalUnpaidTTC}€</span>  <span class="date">avant le</span> <span class="date">${this.convertSAPDate(hero.NetDueDate)}</span>`;
    } else if (hero.StatusInvoicingDocument === 'Totalement Soldée') {
      return `<span class="prelevement-a-venir">Prélèvement le ${this.convertSAPDate(hero.NetDueDate)}</span>`;
    }
    return '';
  }


    
  filterGlobal(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.onGlobalFilter.emit(inputValue); 
  }
}
