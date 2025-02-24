import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../shared/services/brand.service';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { ConsumptionService } from '../../../consumption/services/consumption.service';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../shared/services/contract.service';
import { AppHomeCarouselComponent } from '../../components/carousel/carousel.component';
import { Facture } from '../../../../shared/models/facture-model';
import { AppHomeDocumentsComponent } from '../../components/documents/documents.component';
import { AppHomeConsumptionComponent } from '../../components/consumption/consumption.component';
import { ArticlesComponent } from '../../../../shared/components/articles/articles.component';
import { HeadlineComponent } from '../../../../shared/components/headline/headline.component';
import { InvoicesService } from '../../../../shared/services/invoices.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ContractHttpService } from '../../../../core/http-services/contrat-http.service';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [AppHomeCarouselComponent, AppHomeDocumentsComponent, AppHomeConsumptionComponent, ActiveContractComponent, ArticlesComponent, HeadlineComponent, CommonModule, LoadingSpinnerComponent, LoadingSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class AppHomeComponent {
  selectedContract: any = null;
  theme: string = "";
  carouselData: any[] = [];
  currentUser = signal<User | undefined>(undefined);
  lastInvoice = signal<Facture | null>(null);
  consumptions = signal<ChartConsumption[] | null>(null);

  constructor(
    private contractService: ContractService,
    private invoicesService: InvoicesService,
    private consumptionService: ConsumptionService,
    private brandService: BrandService,
    private authService: AuthService,
    private contractHttpService: ContractHttpService
  ) {

    // Effet : Charger les données lorsque le contrat change
    effect(() => {
      this.contractService.contract$.subscribe(contract => {
        if (contract) {
          this.selectedContract = contract;
          this.loadConsumption(contract.ContractISU);
          this.loadLastInvoice(contract.ContractISU);
        }
      });
    });
  }

  ngOnInit() {
    this.currentUser.set(this.authService.getUserData());
    this.theme = this.brandService.getBrand();
  }

  loadLastInvoice(contractId: string): void {
    this.invoicesService.getInvoices(contractId).subscribe({
      next: (invoices: Facture[]) => {

        // Trier par date décroissante pour trouver la dernière facture
        const sortedInvoices = invoices.sort(
          (a, b) =>
            new Date(b.PostingDate).getTime() -
            new Date(a.PostingDate).getTime()
        );

        // Prendre la première facture après tri
        this.lastInvoice.set(sortedInvoices[0] || null);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des factures:", error);
      },
    });
  }

  loadConsumption(contractNumber: string) {
    contractNumber = '0350103717';
    this.consumptionService.getLastfourChartConsumptionData(contractNumber).subscribe({
      next: (consumptions) => {
        this.consumptions.set(consumptions);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des données de consommation:", error);
      },
    });
  }

  contractPartner: any[] = []; // Assurez-vous que ce n'est pas undefined


  getContractsPartner(CCBusinessPartner: string): void {
    this.contractHttpService.fetchContractPartner(CCBusinessPartner)
      .pipe(
        map(response => response?.d?.results ?? [])
      )
      .subscribe(data => {
        console.log('Données reçues dans le composant :', data);
        this.contractPartner = data; // Assurez-vous que la variable est bien assignée
      });
  }
  
  
}
