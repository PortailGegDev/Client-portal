import { Injectable } from '@angular/core';
import { Chart, Title } from 'chart.js';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { shortFrenchMonth } from '../../../shared/utils/date-utilities';

@Injectable({
    providedIn: 'root'
})
export class ChartOptionsService {

    options: any = null;

    constructor() { }

    initElectChartConsumption(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[], data: any): any {
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
                            return [`Heures pleines: ${hcValue} kWh`, `Heures creuses: ${hpValue} kWh`, `Total: ${hcValue + hpValue} kWh`];
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
                                    text: 'LEGENDE :',
                                    fillStyle: 'transparent',
                                    strokeStyle: 'transparent',
                                    hidden: false
                                },
                                ...defaultLabels // Ajoute les autres légendes
                            ];
                        },
                        boxWidth: 10, // Réduit la taille des icônes des légendes
                        padding: 15,
                        color: 'black',
                    },
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: { weight: 'bold', size: 13 },
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
                },
                background: {
                    borderRadius: {
                        topLeft: 10,
                        topRight: 10
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

    initGazChartConsumption(consumptions: ChartConsumption[], data: any): any {

        return {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        title: (tooltipItem: any) => {
                            return `Mois: ${tooltipItem[0].label}`;
                        },
                        label: (tooltipItem: any) => {
                            const value = consumptions.find(item => item.monthNumber === tooltipItem.dataIndex + 1)?.value ?? 0;

                            return [`Total: ${value} kWh`];
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
                            const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);

                            return [
                                {
                                    text: 'LEGENDE :',
                                    fillStyle: 'transparent',
                                    strokeStyle: 'transparent',
                                    hidden: false
                                },
                                ...defaultLabels
                            ];
                        },
                        boxWidth: 10,
                        padding: 15,
                        color: 'black'
                    },
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: { weight: 'bold', size: 13 },
                    formatter: (value: any, context: any) => {

                        const index = context.dataIndex;
                        const datasetIndex = context.datasetIndex;

                        // Vérifier si c'est la dernière barre de la pile (donc 'heures pleines')
                        if (datasetIndex === data.datasets.length - 1) {
                            const total = value;
                            return total ? `${total} kWh` : '';
                        }

                        return '';
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
                    ticks: {
                        color: 'gray',
                    },
                    grid: {
                        color: '#f3f3f3',
                        drawBorder: false
                    }
                },
                y1: {
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: 'gray'
                    },
                    min: 0,
                    max: 50
                }
            }
        };
    }
}
