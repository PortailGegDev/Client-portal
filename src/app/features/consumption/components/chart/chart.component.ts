import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { AppConsumptionActivationComponent } from '../activation/activation.component';
import { ChartService } from '../../services/chart.service';
import { Constants } from '../../../../shared/utils/constants';
import { ChartOptionsService } from '../../services/chart-options.service';
import { DatePicker } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consumption-chart',
  imports: [CommonModule, FormsModule, PanelModule, ChartModule, SelectButtonModule, SelectModule, ButtonModule, AppConsumptionActivationComponent, DatePicker],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class AppConsumptionChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() consumptions: ChartConsumption[] | null = null;
  @Output() onYearChanged: EventEmitter<number> = new EventEmitter<number>();

  hcConsumptions: ChartConsumption[] = [];
  hpConsumptions: ChartConsumption[] = [];
  baseConsumptions: ChartConsumption[] = [];

  selectedDateConsumption: Date = new Date();
  data: any = null;
  chartData: any = null;
  options: any = null;
  isElectricityEnergyType: boolean = false;

  selectedChartOptionsValue: number = 3;
  chartOptions: any[] = [
    // TODO : A décommenter lors d'avoir les informations nécessaire pour le faire
    // { name: 'Heure', value: 1 },
    // { name: 'Jour', value: 2 },
    { name: 'Mois', value: 3 },
    // { name: 'Année', value: 4 }
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
    private chartOptionsService: ChartOptionsService) {

    this.chartOptionsService.chartOptions$.subscribe((options: any) => {
      if (this.consumptions) {
        this.options = options;
      }
    });
  }

  ngOnInit() {
    // Enregistrer le plugin avant d'initialiser le graphique
    Chart.register(ChartDataLabels);
  }

  ngOnChanges() {
    if (this.consumptions) {
      this.isElectricityEnergyType = this.consumptions[0]?.energy === Constants.EnergyType.ELECTRICITY;
      this.initChartData();
    }
  }

  ngOnDestroy() {
    this.options = null;
    this.chartOptionsService.resetChartOptions();
  }

  initChartData() {
    if (!this.consumptions) {
      return;
    }

    if (this.isElectricityEnergyType) {
      this.hcConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HC');
      this.hpConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HP');
      this.baseConsumptions = this.consumptions.filter(item => item.idSeasonal === 'BASE');
      this.initChart(this.hpConsumptions, this.hcConsumptions, this.baseConsumptions, []);
    } else {
      this.initChart([], [], [], this.consumptions);
    }
  }

  initChart(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[], baseConsumptions: ChartConsumption[], consumptions: ChartConsumption[]) {
    this.data = this.chartService.initChartConsumptionDataByMonth(hpConsumptions, hcConsumptions, baseConsumptions, consumptions);
    this.chartData = this.data;

    if (this.isElectricityEnergyType) {
      this.chartOptionsService.initElectChartConsumption(hpConsumptions, hcConsumptions, baseConsumptions, this.data);
    } else {
      this.chartOptionsService.initGazChartConsumption(consumptions, this.data);
    }
  }

  onOptionClick(event: any) {
    this.chartData = null;
    this.options = null;

    if (event.option.value === 3) {

      if (this.isElectricityEnergyType) {
        this.chartData = this.chartService.initChartConsumptionDataByMonth(this.hpConsumptions, this.hcConsumptions,this.baseConsumptions, []);
        this.chartOptionsService.initElectChartConsumption(this.hpConsumptions, this.hcConsumptions, this.baseConsumptions, this.data);
      } else {
        this.chartData = this.chartService.initChartConsumptionDataByMonth([], [], [], this.consumptions!);
        this.chartOptionsService.initGazChartConsumption(this.consumptions!, this.data);
      }
    }

    if (event.option.value === 4) {
      let groupedConsumptionsByYear: any;

      if (this.isElectricityEnergyType) {
        groupedConsumptionsByYear = this.groupConsumptionByYearElec(this.hpConsumptions, this.hcConsumptions);
        this.chartData = this.chartService.initChartConsumptionDataByYear(groupedConsumptionsByYear, this.isElectricityEnergyType);
        this.chartOptionsService.initChartConsumptionByYearElec(groupedConsumptionsByYear);

      } else {
        groupedConsumptionsByYear = this.groupConsumptionByYearGaz(this.consumptions!);
        this.chartData = this.chartService.initChartConsumptionDataByYear(groupedConsumptionsByYear, this.isElectricityEnergyType);
        this.chartOptionsService.initChartConsumptionByYearGaz(groupedConsumptionsByYear);
      }
    }
  }

  onChangeYear() {
    this.onYearChanged.emit(this.selectedDateConsumption.getFullYear());
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

  private groupConsumptionByYearGaz(consumptions: ChartConsumption[]) {
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
