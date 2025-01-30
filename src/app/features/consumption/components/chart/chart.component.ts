import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
import { Message } from 'primeng/message';
import { AppConsumptionActivationComponent } from '../activation/activation.component';

@Component({
  selector: 'app-consumption-chart',
  imports: [FormsModule, PanelModule, ChartModule, SelectButtonModule, SelectModule, ButtonModule, Message, AppConsumptionActivationComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class AppConsumptionChartComponent implements OnInit, OnChanges {
  @Input() consumptions: ChartConsumption[] | null = null;

  hcConsumptions: ChartConsumption[] = [];
  hpConsumptions: ChartConsumption[] = [];

  data: any;
  options: any;

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

  ngOnInit() {
    // Enregistrer le plugin avant d'initialiser le graphique
    Chart.register(ChartDataLabels);
  }

  ngOnChanges() {
    if (this.consumptions) {
      this.hcConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HC');
      this.hpConsumptions = this.consumptions.filter(item => item.idSeasonal === 'HP');

      this.initChart();
    }

  }

  initChart() {
    this.data = {
      labels: shortFrenchMonth,
      datasets: [
        {
          type: 'line',
          label: 'Données météo',
          borderColor: 'darkgray',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [1, 5, 12, 17, 12, 30, 35, 30, 25, 17, 12, 3],
          yAxisID: 'y1' // Lie la courbe à l'axe `y1`
        },
        {
          type: 'bar',
          label: 'Heures creuses',
          backgroundColor: '#0DB58D',
          data: [
            this.hpConsumptions.find(item => item.monthNumber === 1)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 2)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 3)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 4)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 5)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 6)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 7)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 8)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 9)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 10)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 11)?.value,
            this.hpConsumptions.find(item => item.monthNumber === 12)?.value,
          ],
          borderColor: '#FF6C00'
        },
        {
          type: 'bar',
          label: 'Heures pleines',
          backgroundColor: '#FF6C00',
          data: [
            this.hcConsumptions.find(item => item.monthNumber === 1)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 2)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 3)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 4)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 5)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 6)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 7)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 8)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 9)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 10)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 11)?.value,
            this.hcConsumptions.find(item => item.monthNumber === 12)?.value,
          ]
        },
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        tooltip: {
          enabled: true, // Active les tooltips
          callbacks: {
            // Personnaliser le contenu du tooltip
            title: (tooltipItem: any) => {
              // Utilise le label (mois) comme titre du tooltip
              return `Mois: ${tooltipItem[0].label}`;
            },
            label: (tooltipItem: any) => {
              // Récupérer les valeurs des heures pleines et heures creuses
              const hpValue = this.hpConsumptions.find(item => item.monthNumber === tooltipItem.dataIndex + 1)?.value || 0; // Heure creuse
              const hcValue = this.hcConsumptions.find(item => item.monthNumber === tooltipItem.dataIndex + 1)?.value || 0; // Heure pleine

              // Retourner une ligne avec les valeurs des heures pleines et creuses
              return [`Heures pleines: ${hcValue} kWh`, `Heures creuses: ${hpValue} kWh`];
            }
          },
          backgroundColor: 'rgba(0,0,0,0.7)', // Couleur de fond du tooltip
          titleColor: 'white', // Couleur du titre
          bodyColor: 'white', // Couleur du texte
          borderColor: '#FF6C00', // Bordure du tooltip
          borderWidth: 2, // Largeur de la bordure
          padding: 10, // Espacement intérieur
          caretSize: 5, // Taille de la flèche du tooltip
          position: 'nearest', // Position du tooltip par rapport à l'élément
          displayColors: false // Désactive l'affichage des couleurs à côté des valeurs
        },
        legend: {
          position: 'bottom', // Place la légende en bas
          align: 'end', // Aligne à gauche pour garder une disposition en ligne
          labels: {
            generateLabels: (chart: Chart) => {
              // Récupère les légendes existantes
              const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);

              // Ajoute un "titre" comme premier élément
              return [
                {
                  text: 'LEGENDE :', // Titre de la légende
                  fillStyle: 'transparent', // Pas de couleur de carré pour le titre
                  hidden: false
                },
                ...defaultLabels // Ajoute les autres légendes
              ];
            },
            boxWidth: 10, // Réduit la taille des icônes des légendes
            padding: 15,
          },
        },
        datalabels: {
          anchor: 'end', // Position du texte au-dessus des barres
          align: 'top',  // Alignement du texte
          color: 'gray',
          font: {
            weight: 'bold',
            size: 12
          },
          formatter: (value: any, context: any) => {

            const index = context.dataIndex;
            const datasetIndex = context.datasetIndex;

            // Vérifier si c'est la dernière barre de la pile (donc 'heures pleines')
            if (datasetIndex === this.data.datasets.length - 1) {
              const hpValue = this.hpConsumptions.find(item => item.monthNumber === index + 1)?.value || 0;
              const hcValue = this.hcConsumptions.find(item => item.monthNumber === index + 1)?.value || 0;
              const total = hpValue + hcValue;
              return total ? `${total} kWh` : '';
            }

            return ''; // Ne rien afficher pour la première barre
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: 'gray'
          },
          grid: {
            display: false,
          },
          barPercentage: 0.5, // Réduit la largeur des barres (0 = invisible, 1 = pleine largeur)
          categoryPercentage: 0.6 // Réduit l'espace occupé par chaque catégorie (groupe de barres)
        },
        y: {
          stacked: true,
          title: {
            display: true,
            text: 'kWh', // L'unité affichée en haut de l'axe Y
            color: 'gray',
            font: {
              size: 14
            },
          },
          ticks: {
            color: 'gray',
          },
          grid: {
            color: '#f3f3f3',
            drawBorder: false
          }
        },
        y1: { // Deuxième axe Y
          position: 'right', // Place l'axe à droite
          title: {
            display: true,
            text: 'temp. °C', // L'unité affichée en haut de l'axe Y1
            color: 'gray',
            font: {
              size: 14
            },
          },
          grid: {
            drawOnChartArea: false // Évite les lignes superposées
          },
          ticks: {
            color: 'gray'
          },
          min: 0,  // Fixe le minimum à 0
          max: 50  // Fixe le maximum à 50
        }

      }
    };

  }
}
