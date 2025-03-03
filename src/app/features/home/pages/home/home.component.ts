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
    private authService: AuthService ) {

    // Effet : Réagir aux changements de selectedContract
    effect(() => {
      const selectedContract = this.contractService.selectedContract();
      if (selectedContract) {
        this.loadConsumption(selectedContract.ContractISU);
        this.loadLastInvoice(selectedContract.ContractISU);
      }
    });
  }

  ngOnInit() {
    this.currentUser.set(this.authService.getUserData());
    this.theme = this.brandService.getBrand();

  }

  loadLastInvoice(contractISU: string): void {
    this.invoicesService.getInvoices(contractISU).subscribe({
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

  loadConsumption(contractISU: string) {
    this.consumptionService.getLastfourChartConsumptionData(contractISU).subscribe({
      next: (consumptions) => {
        this.consumptions.set(consumptions);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des données de consommation:", error);
      },
    });
  }
}
