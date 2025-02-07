import { Injectable } from '@angular/core';
import { Chart, Title } from 'chart.js';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { shortFrenchMonth } from '../../../shared/utils/date-utilities';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  options: any = null;

  constructor() { }

  initChartConsumptionData(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[]): any {
    return {
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
            hpConsumptions.find(item => item.monthNumber === 1)?.value,
            hpConsumptions.find(item => item.monthNumber === 2)?.value,
            hpConsumptions.find(item => item.monthNumber === 3)?.value,
            hpConsumptions.find(item => item.monthNumber === 4)?.value,
            hpConsumptions.find(item => item.monthNumber === 5)?.value,
            hpConsumptions.find(item => item.monthNumber === 6)?.value,
            hpConsumptions.find(item => item.monthNumber === 7)?.value,
            hpConsumptions.find(item => item.monthNumber === 8)?.value,
            hpConsumptions.find(item => item.monthNumber === 9)?.value,
            hpConsumptions.find(item => item.monthNumber === 10)?.value,
            hpConsumptions.find(item => item.monthNumber === 11)?.value,
            hpConsumptions.find(item => item.monthNumber === 12)?.value,
          ],
          borderColor: '#FF6C00'
        },
        {
          type: 'bar',
          label: 'Heures pleines',
          backgroundColor: '#FF6C00',
          data: [
            hcConsumptions.find(item => item.monthNumber === 1)?.value,
            hcConsumptions.find(item => item.monthNumber === 2)?.value,
            hcConsumptions.find(item => item.monthNumber === 3)?.value,
            hcConsumptions.find(item => item.monthNumber === 4)?.value,
            hcConsumptions.find(item => item.monthNumber === 5)?.value,
            hcConsumptions.find(item => item.monthNumber === 6)?.value,
            hcConsumptions.find(item => item.monthNumber === 7)?.value,
            hcConsumptions.find(item => item.monthNumber === 8)?.value,
            hcConsumptions.find(item => item.monthNumber === 9)?.value,
            hcConsumptions.find(item => item.monthNumber === 10)?.value,
            hcConsumptions.find(item => item.monthNumber === 11)?.value,
            hcConsumptions.find(item => item.monthNumber === 12)?.value,
          ]
        },
      ]
    };
  }

  initChartConsumption(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[], data: any): any {

    return {
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
              const hpValue = hpConsumptions.find(item => item.monthNumber === tooltipItem.dataIndex + 1)?.value || 0; // Heure creuse
              const hcValue = hcConsumptions.find(item => item.monthNumber === tooltipItem.dataIndex + 1)?.value || 0; // Heure pleine

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
            if (datasetIndex === data.datasets.length - 1) {
              const hpValue = hpConsumptions.find(item => item.monthNumber === index + 1)?.value || 0;
              const hcValue = hcConsumptions.find(item => item.monthNumber === index + 1)?.value || 0;
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
