import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConsumption } from '../../../../shared/models/chart-consumption.model';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { shortFrenchMonth } from '../../../../shared/utils/date-utilities';
import { Chart, Title } from 'chart.js';

@Component({
  selector: 'app-consumption-chart',
  imports: [PanelModule, ChartModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class AppConsumptionChartComponent implements OnChanges {
  @Input() consumptions: ChartConsumption[] | null = null;

  hcConsumptions: ChartConsumption[] = [];
  hpConsumptions: ChartConsumption[] = [];

  data: any;
  options: any;

  ngOnChanges() {
    if (this.consumptions) {

      // TODO: A Supprimer 
      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 12,
        value: 200,
        idSeasonal: 'HP'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 12,
        value: 134,
        idSeasonal: 'HC'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 9,
        value: 123,
        idSeasonal: 'HP'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 9,
        value: 130,
        idSeasonal: 'HC'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 8,
        value: 120,
        idSeasonal: 'HP'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 8,
        value: 90,
        idSeasonal: 'HC'
      });

      this.consumptions.push({
        date: new Date("11/11/1011"),
        monthNumber: 12,
        value: 200,
        idSeasonal: 'HP'
      });

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
        {
          type: 'line',
          label: 'Données météo',
          borderColor: 'gray',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42, 0, 0, 0, 0, 0],
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
              return `Mois: ${tooltipItem.label}`;
            },
            label: (tooltipItem: any) => {
              // Récupérer les valeurs des heures pleines et heures creuses
              debugger

              const month = tooltipItem.label; // Mois actuel
              const hpValue = this.hpConsumptions.find(item => item.monthNumber === tooltipItem.index)?.value || 0; // Heure creuse
              const hcValue = this.hcConsumptions.find(item => item.monthNumber === tooltipItem.index)?.value || 0; // Heure pleine
              // Retourner une ligne avec les valeurs des heures pleines et creuses
              return `Heures pleines: ${hcValue} kWh | Heures creuses: ${hpValue} kWh`;
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
          ticks: {
            color: 'gray'
          },
          grid: {
            color: 'lightgray',
            drawBorder: false
          }
        }
      }
    };

  }
}
