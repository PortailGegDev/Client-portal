import { Injectable } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';
import { ChartConsumption } from '../../../shared/models/chart-consumption.model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class ChartOptionsService {

    private chartOptionsSubject = new BehaviorSubject<any>(null);
    chartOptions$ = this.chartOptionsSubject.asObservable();

    initElectChartConsumption(hpConsumptions: ChartConsumption[], hcConsumptions: ChartConsumption[], data: any) {
        const options = {
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

        this.chartOptionsSubject.next(options);
    }

    initGazChartConsumption(consumptions: ChartConsumption[], data: any) {

        const options = {
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

        this.chartOptionsSubject.next(options);
    }

    initChartConsumptionByYearElec(groupedData: any, data: any) {
        const years = Object.keys(groupedData).map(Number).sort(); // Labels (années)
        const hpValues = years.map(year => groupedData[year].hp); // Données HP
        const hcValues = years.map(year => groupedData[year].hc); // Données HC

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        title: (tooltipItem: any) => `Année: ${tooltipItem[0].label}`,
                        label: (tooltipItem: any) => {
                            const year = parseInt(tooltipItem.label);
                            return [
                                `Heures pleines: ${groupedData[year].hc} kWh`,
                                `Heures creuses: ${groupedData[year].hp} kWh`,
                                `Total: ${groupedData[year].hc + groupedData[year].hp} kWh`
                            ];
                        }
                    },
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#FF6C00',
                    borderWidth: 2,
                    padding: 10,
                    caretSize: 5,
                    position: 'nearest',
                    displayColors: false
                },
                legend: {
                    position: 'bottom',
                    align: 'end',
                    labels: {
                        generateLabels: (chart: Chart) => [
                            { text: 'LEGENDE :', fillStyle: 'transparent', hidden: false },
                            ...Chart.defaults.plugins.legend.labels.generateLabels(chart)
                        ],
                        boxWidth: 10,
                        padding: 15
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: { weight: 'bold', size: 13 },
                    formatter: (value: number, context: any) => {
                        if (context.datasetIndex === 1) {
                            const index = context.dataIndex;
                            const total = hpValues[index] + hcValues[index];
                            return `${total.toLocaleString()} kWh`;
                        }
                        return ''; // Ne rien afficher sur l'autre série
                    }
                }

            },
            scales: {
                x: { stacked: true, ticks: { color: 'gray' }, grid: { display: false }, barPercentage: 0.5, categoryPercentage: 0.6 },
                y: {
                    stacked: true,
                    ticks: { color: 'gray' },
                    grid: { color: '#f3f3f3', drawBorder: false }
                }
            },
            labels: years,
            datasets: [
                { type: 'bar', label: 'Heures creuses', backgroundColor: '#0DB58D', data: hpValues },
                { type: 'bar', label: 'Heures pleines', backgroundColor: '#FF6C00', data: hcValues, borderRadius: 5, }
            ]
        };

        this.chartOptionsSubject.next(options);
    }

    initChartConsumptionByYearGaz(groupedData: any, data: any) {
        const years = Object.keys(groupedData).map(Number).sort();
        const values = years.map(year => groupedData[year].value);

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            labels: years,
            datasets: [
                {
                    label: 'Gaz',
                    borderRadius: 5,
                    data: values,
                    backgroundColor: '#00AFCB'
                }
            ],
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        title: (tooltipItem: any) => `Année: ${tooltipItem[0].label}`,
                        label: (tooltipItem: any) => {
                            const year = parseInt(tooltipItem.label);
                            return [
                                `Total: ${groupedData[year].value} kWh`
                            ];
                        }
                    },
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#FF6C00',
                    borderWidth: 2,
                    padding: 10,
                    caretSize: 5,
                    position: 'nearest',
                    displayColors: false
                },
                legend: {
                    position: 'bottom',
                    align: 'end',
                    labels: {
                        generateLabels: (chart: Chart) => [
                            { text: 'LEGENDE :', fillStyle: 'transparent', hidden: false },
                            ...Chart.defaults.plugins.legend.labels.generateLabels(chart)
                        ],
                        boxWidth: 10,
                        padding: 15
                    }
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: 'black',
                    font: { weight: 'bold', size: 13 },
                    formatter: (_: any, context: any) => {
                        const index = context.dataIndex;
                        const value = values[index];
                        return value ? `${value} kWh` : '';
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    ticks: { color: 'gray' },
                    grid: { display: false },
                    barPercentage: 0.5,
                    categoryPercentage: 0.6
                },
                y: {
                    stacked: false,
                    title: {
                        display: true,
                        text: 'kWh',
                        color: 'gray',
                        font: { size: 14 }
                    },
                    ticks: { color: 'gray' },
                    grid: { color: '#f3f3f3', drawBorder: false }
                }
            }
        };

        this.chartOptionsSubject.next(options);
    }

    
    initHomeChartConsumption(consumptions: ChartConsumption[]) {

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
                datalabels: {
                    color: "black",
                    display: true,
                    align: "top",
                    anchor: "center",
                    font: {
                        size: 14,
                        weight: "500",
                    }, 
                    formatter: (value: any, context: any) => {
                        const month = context.chart.data.labels ? context.chart.data.labels[context.dataIndex] : null;
                        return `${value} kWh\n${month} `;
                    },
                },
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false
                },
            },
            layout: {
                padding: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                },
            },
        };

        this.chartOptionsSubject.next(options);
    }

    resetChartOptions() {
        this.chartOptionsSubject.next(null);
    }
}
