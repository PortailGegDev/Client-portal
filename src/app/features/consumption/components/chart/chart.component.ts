import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { Chart, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { AppConsumptionActivationComponent } from '../activation/activation.component';
import { ChartService } from '../../services/chart.service';
import { Constants } from '../../../../shared/utils/constants';

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
  chartData: any = null;
  options: any = null;
  isElectricityEnergyType: boolean = false;

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
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    // Enregistrer le plugin avant d'initialiser le graphique
    Chart.register(ChartDataLabels);
  }

  ngOnChanges() {
    if (this.consumptions) {
      this.isElectricityEnergyType = this.consumptions[0].Energy === Constants.EnergyType.ELECTRICITY;
      this.initChartData();
    }
  }

  initChartData() {
    if (!this.consumptions) {
      return;
    }

    if (this.isElectricityEnergyType) {
      this.hcConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HC');
      this.hpConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HP');
      this.initChart(this.hpConsumptions, this.hcConsumptions, []);
    } else {
      this.initChart([], [], this.consumptions);
    }
  }

  initChart(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[], consumptions: ChartConsumption[]) {
    this.data = this.chartService.initChartConsumptionDataByMonth(hpConsumptions, hcConsumptions, consumptions);
    this.chartData = this.data;

    if (this.isElectricityEnergyType) {
      this.options = this.chartService.initElectChartConsumption(hpConsumptions, hcConsumptions, this.data);
    } else {
      this.options = this.chartService.initGazChartConsumption(consumptions, this.data);
    }

    // Forcer l’actualisation de l’UI
    this.cd.detectChanges();
  }

  onOptionClick(event: any) {
    this.chartData = null;
    // Forcer l’actualisation de l’UI
    this.cd.detectChanges();

    if (event.index === 2) {
      this.chartData = this.chartService.initChartConsumptionDataByMonth(this.hpConsumptions, this.hcConsumptions, this.consumptions!);

      if (this.isElectricityEnergyType) {
        this.options = this.chartService.initElectChartConsumption(this.hpConsumptions, this.hcConsumptions, this.data);
      } else {
        this.options = this.chartService.initGazChartConsumption(this.consumptions!, this.data);
      }
    }

    if (event.index === 3) {
      let groupedConsumptionsByYear: any;

      if (this.isElectricityEnergyType) {
        groupedConsumptionsByYear = this.groupConsumptionByYearElec(this.hpConsumptions, this.hcConsumptions);

      } else {
        groupedConsumptionsByYear = this.groupConsumptionByYearGas(this.consumptions!);
      }

      if (this.isElectricityEnergyType) {
        this.chartData = this.chartService.initChartConsumptionByYearElec(groupedConsumptionsByYear, this.chartData);
        this.options = this.chartService.initChartConsumptionByYearElec(groupedConsumptionsByYear, this.chartData);

      } else {
        this.chartData = this.chartService.initChartConsumptionByYearGaz(groupedConsumptionsByYear, this.chartData);
        this.options = this.chartService.initChartConsumptionByYearGaz(groupedConsumptionsByYear, this.chartData);
      }
    }
  }

  private groupConsumptionByYearElec(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[]) {
    const yearlyData: { [year: number]: { hp: number, hc: number } } = {};

    [...hpConsumptions, ...hcConsumptions].forEach(item => {
      if (!yearlyData[item.year]) {
        yearlyData[item.year] = { hp: 0, hc: 0 };
      }
      if (hpConsumptions.includes(item)) {
        yearlyData[item.year].hp += item.value;
      } else {
        yearlyData[item.year].hc += item.value;
      }
    });

    return yearlyData;
  }


  private groupConsumptionByYearGas(consumptions: ChartConsumption[]) {
    const yearlyData: { [year: number]: { value: number } } = {};

    consumptions.forEach(item => {
      if (!yearlyData[item.year]) {
        yearlyData[item.year] = { value: 0 };
      }
      yearlyData[item.year].value += item.value;
    });

    return yearlyData;
  }

}
