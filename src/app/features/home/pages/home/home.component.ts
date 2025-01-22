import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContractHttpService } from '../../../../core/http-services/contrat-http.service';
import { FactureService } from '../../../../core/http-services/facture.service';
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../core/services/brand.service';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../core/models/user.model';
import { ChartModule } from 'primeng/chart';
import { ConsumptionService } from '../../../../core/services/consumption.service';
import { ChartConsumption } from '../../../../core/models/chart-consumption.model';
import { getMonthNameByMonthNumber } from '../../../../shared/utils/date-utilities';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../core/services/contract.service';
import { ButtonModule } from 'primeng/button';
import { AppHomeCarouselComponent } from '../../components/carousel/carousel.component';
import { Facture } from '../../../../core/models/facture-model';
import { AppHomeDocumentsComponent } from '../../components/documents/documents.component';
import { AppHomeConsumptionComponent } from '../../components/consumption/consumption.component';
import { ArticlesComponent } from '../../../../shared/components/articles/articles.component';
import { HeadlineComponent } from '../../../../shared/components/headline/headline.component';

interface Carousel {
  title: string;
  subtitle: string;
  img: string;
  action: string;
}

@Component({
  selector: 'app-home',
  imports: [AppHomeCarouselComponent, AppHomeDocumentsComponent, AppHomeConsumptionComponent, ActiveContractComponent, ArticlesComponent, HeadlineComponent, CommonModule, ChartModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class AppHomeComponent {
  selectedContract: any = null;
  theme: string = "";
  currentUser?: User;
  carouselData: any[] = [];
  lastInvoice: Facture | null = null;
  consumptions: ChartConsumption[] = [];

  constructor(
    private router: Router,
    private contractService: ContractHttpService,
    private contractServicee: ContractService,
    private factureService: FactureService,
    private consumptionService: ConsumptionService,
    private brandService: BrandService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Chart.register(...registerables);


    this.contractServicee.contract$.subscribe((data) => {
      this.selectContract = data;
      this.loadConsumption(data.ContractISU);
      this.loadLastInvoice(data.ContractISU);
    });

    this.http.get<{ carouselData: Carousel[] }>('/carousel.json').subscribe({
      next: (data: any) => {
        this.carouselData = data.carousel;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données de carousel :', error);
      },
      complete: () => {
        console.log('Chargement des données de carousel terminé');
      }
    });
  }

  ngOnInit() {
    this.selectedContract = this.contractts[0];
    this.fetchContracts();
    this.theme = this.brandService.getBrand();
    // this.loadLastFacture();
    this.currentUser = this.authService.getUserData();
  }

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
  loadLastInvoice(contractId: string): void {
    this.factureService.fetchFactures(contractId).subscribe({
      next: (response) => {
        const invoices = response.d.results;

        // Trier par date décroissante pour trouver la dernière facture
        const sortedInvoices = invoices.sort(
          (a, b) =>
            new Date(b.PostingDate).getTime() -
            new Date(a.PostingDate).getTime()
        );

        // Prendre la première facture après tri
        this.lastInvoice = sortedInvoices[0];
      },
      error: (error) => {
        console.error("Erreur lors du chargement des factures:", error);
      },
    });
  }

  loadConsumption(contractNumber: string) {
    contractNumber = '0350103717';
    this.consumptionService.getChartConsumptionData(contractNumber).subscribe({
      next: (consumptions) => {
        this.consumptions = consumptions
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Tri descendant
          .slice(0, 4);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des données de consommation:", error);
      },
    });
  }

  ngAfterViewInit() {
    // this.loadConsumptionChart();
  }

  loadConsumptionChart(consumptions: any[]) {
    const ctx = document.getElementById(
      "consumptionChart"
    ) as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        plugins: [ChartDataLabels],
        data: {
          labels: [
            `${getMonthNameByMonthNumber(consumptions[3].monthNumber)} (kWh)`,
            `${getMonthNameByMonthNumber(consumptions[2].monthNumber)} (kWh)`,
            `${getMonthNameByMonthNumber(consumptions[1].monthNumber)} (kWh)`,
            `${getMonthNameByMonthNumber(consumptions[0].monthNumber)} (kWh)`
          ],
          datasets: [
            {
              data: [consumptions[3].value, consumptions[2].value, consumptions[1].value, consumptions[0].value],
              backgroundColor: [
                'rgba(255, 108, 0, 0.10)',
                'rgba(255, 108, 0, 0.10',
                'rgba(255, 108, 0, 0.20)',
                'rgba(255, 108, 0, 0.30)'],
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
                // const month = context.chart.data.labels ? context.chart.data.labels[context.dataIndex] : null;
                // return `${value} kWh\n${month}`;
              },
            },
          },
          scales: {
            x: {
              display: true,
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
    this.contractService.fetchContractISU(null).subscribe(
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
