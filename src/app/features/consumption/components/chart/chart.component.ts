import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { shortFrenchMonth } from '../../../../shared/utils/date-utilities';
import { Chart, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { AppConsumptionActivationComponent } from '../activation/activation.component';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-consumption-chart',
  imports: [FormsModule, PanelModule, ChartModule, SelectButtonModule, SelectModule, ButtonModule, AppConsumptionActivationComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class AppConsumptionChartComponent implements OnInit, OnChanges {
  @Input() consumptions: ChartConsumption[] | null = null;

  hcConsumptions: ChartConsumption[] = [];
  hpConsumptions: ChartConsumption[] = [];

  data: any = null;
  options: any = null;

  selectedChartOptionsValue: number = 3;
  chartOptions: any[] = [
    { name: 'Heure', value: 1 },
    { name: 'Jour', value: 2 },
    { name: 'Mois', value: 3 },
    { name: 'Année', value: 4 }
  ];

  selectUnityValue: number = 1;
  unityOptions: any[] = [
    { name: 'kWh', value: 1 },
    { name: '€', value: 2 }
  ];

  selectedTypeDataChart = 'DM';
  typeDataChart: any[] = [
    { name: 'Données météo', code: 'DM' },
    { name: 'Période précédente', code: 'PP' },
    { name: 'Evénements', code: 'EVENT' }
  ];

  constructor(private chartService: ChartService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Enregistrer le plugin avant d'initialiser le graphique
    Chart.register(ChartDataLabels);
  }

  ngOnChanges() {
    if (this.consumptions) {
      this.hcConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HC');
      this.hpConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HP');

      this.initChart(this.hpConsumptions, this.hcConsumptions);
    }
  }

  initChart(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[]) {
    this.data = this.chartService.initChartConsumptionData(hpConsumptions, hcConsumptions);
    this.options = this.chartService.initChartConsumption(hpConsumptions, hcConsumptions, this.data);

    // Forcer l’actualisation de l’UI
    this.cd.detectChanges(); 
  }
}
