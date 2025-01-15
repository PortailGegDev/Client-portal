import { Component, HostListener } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ContractService } from '../../../../core/http-services/contrat.service';
import { BrandService } from '../../../../core/service/brand.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consumption',
  imports: [CommonModule],
  templateUrl: './consumption.component.html',
  styleUrl: './consumption.component.scss'
})
export class AppConsumptionComponent {
  chart: any;
  currentUnit: string = 'kWh';  // Par défaut en kWh
  currentTimeScale: string = 'month';


  ngOnInit(): void {
    this.selectedContract = this.contractts[0];
    this.fetchContracts();
    this.createChart();
    setTimeout(() => this.createChart(), 0);

  }

  constructor(
    private router: Router,
    private contractService: ContractService,
    private brandService: BrandService,
    private http: HttpClient
  ) { }

  isDropdownOpen = false;

  toggleDropdown(event: Event): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    event.stopPropagation(); // Prevents closing the dropdown immediately
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown');
    if (!clickedInside) {
      this.isDropdownOpen = false; // Close the dropdown if clicked outside
    }
  }
  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
  setTimeScale(scale: string) {
    this.currentTimeScale = scale;
    this.updateChart();
  }


  getLabels() {
    switch (this.currentTimeScale) {
      case 'hour':
        return ['00:00', '01:00', '02:00', '03:00', /* ... jusqu'à 23:00 */];
      case 'day':
        return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
      case 'month':
        return ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
      case 'year':
        return ['2020', '2021', '2022', '2023', '2024'];
      default:
        return [];
    }
  }

  getData() {
    switch (this.currentTimeScale) {
      case 'hour':
        return this.currentUnit === 'kWh' ? [300, 2850, 1150, 2950, 23450 /* ... */] : [10, 20, 15, /* ... */];
      case 'day':
        return this.currentUnit === 'kWh' ? [1500, 1800, 1700, /* ... */] : [150, 180, 170, /* ... */];
      case 'month':
        return this.currentUnit === 'kWh' ? [35000, 28560, 11500, 29570, 23450, 21470, 0, 0, 0, 0, 0, 0 /* ... */] : [1000, 1200, 1100, /* ... */];
      case 'year':
        return this.currentUnit === 'kWh' ? [12000, 14000, 13000, /* ... */] : [12000, 14000, 13000, /* ... */];
      default:
        return [];
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

  createChart() {
    const canvas = document.getElementById('radarChart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (ctx) {
      const data = this.getData();
      const labels = this.getLabels();
      const getGradient = (value: number) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400); // ajustez la hauteur selon vos besoins
        gradient.addColorStop(0.5, '#FF6C00'); // Couleur pour 20%
        gradient.addColorStop(1, '#FF6C00'); // Couleur pour 20%
        gradient.addColorStop(1, '#0DB58D'); // Couleur pour le reste
        gradient.addColorStop(1, '#0DB58D'); // Couleur pour le reste
        return gradient;
      };
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.getLabels(),  // Utiliser les labels dynamiques
          datasets: [{
            label: this.currentUnit === 'kWh' ? 'kWh' : '€',
            data: this.getData(),  // Utiliser les données dynamiques
            backgroundColor: data.map(value => getGradient(value)), // Appliquer le gradient à chaque barre
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            yAxisID: 'y-axis-energy'
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                autoSkip: false // Afficher tous les labels de l'axe des X
              },
              grid: {
                display: false // Masquer les lignes de grille si nécessaire
              }
            },
            'y-axis-energy': {
              beginAtZero: true,
              position: 'left',
              ticks: {
                stepSize: this.currentUnit === 'kWh' ? 5000 : 5000,
                callback: (value) => value, // Add unit here
              },
              title: {
                display: true,
                text: this.currentUnit === 'kWh' ? 'Energy Consumption (kWh)' : 'Cost (€)'
              },
              suggestedMin: 0,
              suggestedMax: this.currentUnit === 'kWh' ? 40000 : 40000
            },
            'y-axis-temperature': {
              beginAtZero: true,
              position: 'right',
              ticks: {
                stepSize: 5,
                callback: (value) => value,
              },
              title: {
                display: true,
                text: 'Temperature (°C)',
                // align: 'end',
                // padding: { top: 0, bottom: 20 },

              },
              suggestedMin: 0,
              suggestedMax: 40
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.raw as number;
                  return `${value} ${this.currentUnit === 'kWh' ? 'kWh' : '€'}`; // Use € symbol here
                }
              }
            }
          }
        }
      });
    } else {
      console.error('Failed to get context for canvas.');
    }
  }

  getTimeUnit() {
    switch (this.currentTimeScale) {
      case 'hour': return 'hour';
      case 'day': return 'day';
      case 'month': return 'month';
      case 'year': return 'year';
      default: return 'month';
    }
  }

  getTemperatureData() {
    // Remplacer par tes données de température
    return [0, 5, 22, 18, 21]; // Exemples de températures en °C
  }
  setUnit(unit: string) {
    this.currentUnit = unit;
    this.updateChart();
  }
  showDatepicker: boolean = false;
  toggleDatepicker() {
    this.showDatepicker = !this.showDatepicker;
  }
  // contracts = [
  //   { value: 'contract1', label: '16 rue Pierre Larousse, 75014 Paris Electricite, n° 1456378' },
  //   { value: 'contract2', label: 'Contrat 2' },
  //   { value: 'contract3', label: 'Contrat 3' },
  //   { value: 'contract4', label: 'Contrat 4' }
  // ];
  get contractCount(): number {
    return this.contractts.length;
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

  toggleDropdownc() {
    this.isOpen = !this.isOpen; // Alterner l'état du menu déroulant
  }

  contractts: any[] = [];
  fetchContracts(): void {
    this.contractService.fetchContractISU().subscribe(
      data => {
        console.log('Données reçues:', data);  // Affiche les données reçues dans la console
        if (data?.d?.results) {
          this.contractts = data.d.results; // Récupère le tableau de résultats
          console.log(this.businessSectorText);
          if (this.contractts.length > 0) {
            this.selectedContract = this.contractts[0];  // Le premier contrat sera sélectionné par défaut

          }
        } else {
          console.error('Aucune donnée trouvée.');
          this.contractts = []; // Assure que contractts est un tableau vide si aucune donnée n'est trouvée
        }
      },
      error => {
        console.error('Erreur lors de la récupération des données:', error); // Affiche l'erreur dans la console en cas de problème
        this.contractts = []; // Assure que contractts reste vide en cas d'erreur
      }
    );
  }
}
