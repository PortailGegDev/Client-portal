import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractService } from '../../../../core/http-services/contrat.service';
import { FactureService } from '../../../../core/http-services/facture.service';
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../core/service/brand.service';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class AppHomeComponent {
  selectedContract: any = null;
  consumptionData: number[] = [30, 50, 25, 40];
  facture: { statut: string; date: string };
  theme: string = "";
  currentUser?: User;

  constructor(
    private router: Router,
    private contractService: ContractService,
    private factureService: FactureService,
    private brandService: BrandService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Chart.register(...registerables);
    this.facture = {
      statut: "payer", // ou 'A payer'
      date: "5 Mai 2023",
    };
  }

  ngOnInit() {
    this.selectedContract = this.contractts[0];
    this.fetchContracts();
    this.theme = this.brandService.getBrand();
    this.loadLastFacture();
    this.currentUser = this.authService.getUserData();
  }

  lastFacture: { statut: string; date: string | null } | null = null;

  payFacture(facture: { statut: string; date: string }): void {
    if (facture.statut === "A payer") {
      console.log("Paiement de la facture en cours...");
    }
  }
  downloadPDF(facture: { statut: string; date: string }): void {
    if (facture.statut === "payer") {
      console.log("Téléchargement du PDF de la facture...");
    }
  }
  loadLastFacture(): void {
    this.factureService.fetchFactures().subscribe({
      next: (response) => {
        const factures = response.d.results;

        // Trier par date décroissante pour trouver la dernière facture
        const sortedFactures = factures.sort(
          (a, b) =>
            new Date(b.PostingDate).getTime() -
            new Date(a.PostingDate).getTime()
        );

        // Prendre la première facture après tri
        const lastFacture = sortedFactures[0];

        if (lastFacture) {
          this.lastFacture = {
            statut:
              lastFacture.StatusInvoicingDocument === "Non Soldée"
                ? "A payer"
                : lastFacture.StatusInvoicingDocument === "Totalement Soldée"
                  ? "payer"
                  : "Autre statut",
            date: this.convertSAPDate(lastFacture.PostingDate),
          };
          console.log("Dernière facture:", this.lastFacture); // Vérification dans la console
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des factures:", error);
      },
    });
  }

  convertSAPDate(sapDate: string): string | null {
    if (!sapDate || typeof sapDate !== "string") {
      console.warn("Date invalide:", sapDate);
      return null;
    }

    const match = /\/Date\((\d+)\)\//.exec(sapDate);
    if (!match || match.length < 2) {
      console.warn("Format de date non reconnu:", sapDate);
      return null;
    }

    const timestamp = parseInt(match[1], 10);
    const date = new Date(timestamp);

    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  ngAfterViewInit() {
    this.loadConsumptionChart();
  }

  loadConsumptionChart() {
    const ctx = document.getElementById(
      "consumptionChart"
    ) as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        plugins: [ChartDataLabels],
        data: {
          labels: ["Mai", "Juin", "Juillet", "Août"],
          datasets: [
            {
              data: this.consumptionData,
              backgroundColor: ["#ffb74d", "#ffb74d", "#ffb74d", "#ffb74d"],
              categoryPercentage: 0.97, // l'espace entre les barres
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Permet de maintenir le ratio d'aspect
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              color: "black",
              display: true,
              align: "center",
              anchor: "center",
              font: {
                size: 14,
                weight: "bold",
              },
              formatter: (value, context) => {
                const month = context.chart.data.labels ? context.chart.data.labels[context.dataIndex] : null;
                return `${value} kWh\n${month}`;
              },
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
        },
      });
    } else {
      console.error("consumptionChart element not found");
    }
  }
  navigateToConsumption() {
    this.router.navigate(["/consumption"]);
  }
  navigateToDocument() {
    this.router.navigate(["/documents"]);
  }
  navigateToService() {
    this.router.navigate(["/services"]);
  }
  get contractCount(): number {
    return this.contractts.length;
  }
  // contracts = [
  //   { value: 'contract1', address: '16 rue Pierre Larousse, 75014 Paris   |', details: 'Electricite, n° 1456378' },
  //   { value: 'contract2', address: '33 rue Pierre Curie,    49000 Angers  |', details: 'Electricite, n° 1456378' },
  // ];

  addressCompteur: string = '';
  businessSectorText: string = '';
  isOpen: boolean = false;
  selectContract(contract: any) {
    this.addressCompteur = contract.AddressCompteur; // Mettre à jour l'adresse sélectionnée
    this.businessSectorText = contract.BusinessSectorText; // Mettre à jour les détails sélectionnés
    this.isOpen = false;
    this.selectedContract = contract;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen; // Alterner l'état du menu déroulant
  }

  contractts: any[] = [];
  fetchContracts(): void {
    this.contractService.fetchContractISU().subscribe(
      (data) => {
        console.log("Données reçues:", data); // Affiche les données reçues dans la console
        if (data?.d?.results) {
          this.contractts = data.d.results; // Récupère le tableau de résultats
          console.log(this.businessSectorText);
          if (this.contractts.length > 0) {
            this.selectedContract = this.contractts[0]; // Le premier contrat sera sélectionné par défaut
          }
        } else {
          console.error("Aucune donnée trouvée.");
          this.contractts = []; // Assure que contractts est un tableau vide si aucune donnée n'est trouvée
        }
      },
      (error) => {
        console.error("Erreur lors de la récupération des données:", error); // Affiche l'erreur dans la console en cas de problème
        this.contractts = []; // Assure que contractts reste vide en cas d'erreur
      }
    );
  }
}
