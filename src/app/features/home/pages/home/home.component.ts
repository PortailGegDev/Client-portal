import { Component, effect, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../shared/services/brand.service';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { ConsumptionService } from '../../../consumption/services/consumption.service';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';
import { ContractService } from '../../../../shared/services/contract.service';
import { AppHomeCarouselComponent } from '../../components/carousel/carousel.component';
import { Invoice } from '../../../../shared/models/invoice-model';
import { AppHomeDocumentsComponent } from '../../components/documents/documents.component';
import { AppHomeConsumptionComponent } from '../../components/consumption/consumption.component';
import { ArticlesComponent } from '../../../../shared/components/articles/articles.component';
import { HeadlineComponent } from '../../../../shared/components/headline/headline.component';
import { InvoicesService } from '../../../invoices/services/invoices.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { Constants } from '../../../../shared/utils/constants';

@Component({
  selector: 'app-home',
  imports: [AppHomeCarouselComponent, AppHomeDocumentsComponent, AppHomeConsumptionComponent, ActiveContractComponent, ArticlesComponent, HeadlineComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class AppHomeComponent {
  selectedContract: Signal<Contract | null>;
  theme: string = "";
  carouselData: any[] = [];

  selectedContractsDetails: ContractDetails | null = null;

  currentUser = signal<User | undefined>(undefined);
  lastInvoice = signal<Invoice | null>(null);
  invoices = signal<Invoice[]>([]);
  consumptions = signal<ChartConsumption[] | null>(null);

  constructor(
    private contractService: ContractService,
    private invoicesService: InvoicesService,
    private consumptionService: ConsumptionService,
    private brandService: BrandService,
    private authService: AuthService) {
    this.selectedContract = this.contractService.selectedContract;

    effect(() => {
      if (this.selectedContract()) {
        this.loadConsumption(this.selectedContract()!.ContractISU);
        this.loadLastInvoice(this.selectedContract()!.ContractISU);
        this.loadContractDetails(this.selectedContract()!.ContractISU);
      }
    });
  }

  ngOnInit() {
    this.currentUser.set(this.authService.getUserData());
    this.theme = this.brandService.getBrand();
  }

  loadLastInvoice(contractISU: string): void {
    this.invoicesService.getInvoices(contractISU).subscribe({
      next: (invoices: Invoice[]) => {
        this.invoices.set(invoices);
        this.lastInvoice.set(invoices[0] || null);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des factures:", error);
      },
    });
  }

  loadConsumption(contractISU: string) {
    this.consumptionService.getLastfourChartConsumptionData(contractISU).subscribe({
      next: (consumptions) => {
        console.log('Données de consommations du contrat contractISU : ', consumptions)
        this.consumptions.set(consumptions);
      },
      error: (error) => {
        console.error("Erreur lors du chargement des données de consommation:", error);
      },
    });
  }

  loadContractDetails(contractISU: string) {
    let contractIsuList: string[] = [];
    contractIsuList.push(contractISU);

    this.contractService.getContractsByContractISUList(contractIsuList).subscribe({

      next: (contracts: ContractDetails[]) => {
        this.selectedContractsDetails = contracts[0];
        console.log('Contrat détaillé ', this.selectedContractsDetails);
      }
    });
  }
}
