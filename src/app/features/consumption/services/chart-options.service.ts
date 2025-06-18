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
        const hcMaxValue = hcConsumptions!.length > 0 ? Math.max(...hcConsumptions!.map(item => item.value)) : 0;
        const hpMaxValue = hpConsumptions!.length > 0 ? Math.max(...hpConsumptions!.map(item => item.value)) : 0;

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                tooltip: {
                    ...this.getTooltipOptions(),
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
                },
                legend: this.getLegendOptions(),
                datalabels: {
                    ...this.getDatasetOptions(),
                    formatter: (value: any, context: any) => {

                        if (window.innerWidth <= 900) {
                            return '';
                        }

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
            scales: this.getScalesOptionsWithMeteo(true, hcMaxValue + hpMaxValue)
        };

        this.chartOptionsSubject.next(options);
    }

    initGazChartConsumption(consumptions: ChartConsumption[], data: any) {
        const maxConsumptionValue = consumptions.length > 0 ? Math.max(...consumptions.map(item => item.value)) : 0;

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                tooltip: {
                    ...this.getTooltipOptions(),
                    callbacks: {
                        title: (tooltipItem: any) => {
                            return `Mois: ${tooltipItem[0].label}`;
                        },
                        label: (tooltipItem: any) => {
                            const value = consumptions.find(item => item.monthNumber === tooltipItem.dataIndex + 1)?.value ?? 0;

                            return [`Total: ${value} kWh`];
                        }
                    },
                },
                legend: this.getLegendOptions(),
                datalabels: {
                    ...this.getDatasetOptions(),
                    formatter: (value: any, context: any) => {
                        
                        if (window.innerWidth <= 900) {
                            return '';
                        }

                        const index = context.dataIndex;
                        const datasetIndex = context.datasetIndex;

                        if (datasetIndex === data.datasets.length - 1) {
                            const total = value;
                            return total ? `${total} kWh` : '';
                        }

                        return '';
                    }
                }
            },
            scales: this.getScalesOptionsWithMeteo(true, maxConsumptionValue)
        };

        this.chartOptionsSubject.next(options);
    }

    initChartConsumptionByYearElec(groupedData: any) {
        const years = Object.keys(groupedData).map(Number).sort(); // Labels (années)
        const hpValues = years.map(year => groupedData[year].hp); // Données HP
        const hcValues = years.map(year => groupedData[year].hc); // Données HC

        const hcMaxValue = hcValues!.length > 0 ? Math.max(...hcValues) : 0;
        const hpMaxValue = hpValues!.length > 0 ? Math.max(...hpValues) : 0;

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                tooltip: {
                    ...this.getTooltipOptions(),
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
                    }
                },
                legend: this.getLegendOptions(),
                datalabels: {
                    ...this.getDatasetOptions(),
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
            scales: this.getScalesOptions(true, hcMaxValue + hpMaxValue),
        };

        this.chartOptionsSubject.next(options);
    }

    initChartConsumptionByYearGaz(groupedData: any) {
        const years = Object.keys(groupedData).map(Number).sort();
        const values = years.map(year => groupedData[year].value);

        const maxValue = values!.length > 0 ? Math.max(...values) : 0;

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                tooltip: {
                    ...this.getTooltipOptions(),
                    callbacks: {
                        title: (tooltipItem: any) => `Année: ${tooltipItem[0].label}`,
                        label: (tooltipItem: any) => {
                            const year = parseInt(tooltipItem.label);
                            return [
                                `Total: ${groupedData[year].value} kWh`
                            ];
                        }
                    }
                },
                legend: this.getLegendOptions(),
                datalabels: {
                    ...this.getDatasetOptions(),
                    formatter: (_: any, context: any) => {

                        const index = context.dataIndex;
                        const value = values[index];
                        return value && window.innerWidth > 900 ? `${value} kWh` : '';
                    }
                }
            },
            scales: this.getScalesOptions(false, maxValue),
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
                    display: false,
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

    private getScalesOptions(stacked: boolean, maxConsumptionValue: number): any {
        return {
            x: {
                stacked: stacked,
                ticks: { color: 'gray' },
                grid: { display: false },
                barPercentage: 0.5,
                categoryPercentage: 0.6,
                autoSkip: false,
            },
            y: {
                stacked: stacked,
                beginAtZero: true,
                ticks: { color: 'gray' },
                grid: { color: '#f3f3f3', drawBorder: false },
                max: this.getYMaxValue(maxConsumptionValue),
            },
        };
    }

    private getScalesOptionsWithMeteo(stacked: boolean, maxConsumptionValue: number): any {
        return {
            ...this.getScalesOptions(stacked, maxConsumptionValue),
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
        };
    }

    private getLegendOptions(): any {
        return {
            position: 'bottom',
            align: 'end',
            onClick: () => { },
            labels: {
                generateLabels: (chart: Chart) => {
                    const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);

                    const dynamicLabels = defaultLabels.map(label => {
                        // si datasetIndex est ∅, on renvoie juste le label sans toucher aux couleurs
                        if (label.datasetIndex == null) {
                            return label;
                        }

                        const ds = chart.data.datasets[label.datasetIndex];
                        const hasNonZero = (ds.data as number[]).some(v => v !== 0);
                        const color = hasNonZero ? (ds.borderColor as string) : '#F8F6F5';

                        return {
                            ...label,
                            fillStyle: color,
                            strokeStyle: color,
                            textColor: color
                        };
                    });

                    return [
                        {
                            text: 'LÉGENDE :',
                            fillStyle: 'transparent',
                            strokeStyle: 'transparent',
                            textColor: 'black',
                            hidden: false
                        },
                        ...dynamicLabels
                    ];
                },
                boxWidth: 10,
                padding: 15
            }
        };
    }

    private getDatasetOptions(): any {
        return {
            anchor: 'end',
            align: 'top',
            color: 'black',
            font: { weight: 'bold', size: 13 },
        };
    }

    private getTooltipOptions(): any {
        return {
            enabled: true, // Active les tooltips
            backgroundColor: 'rgba(0,0,0,0.7)', // Couleur de fond du tooltip
            titleColor: 'white', // Couleur du titre
            bodyColor: 'white', // Couleur du texte
            borderColor: '#FF6C00', // Bordure du tooltip
            borderWidth: 2, // Largeur de la bordure
            padding: 10, // Espacement intérieur
            caretSize: 5, // Taille de la flèche du tooltip
            position: 'nearest', // Position du tooltip par rapport à l'élément
            displayColors: false, // Désactive l'affichage des couleurs à côté des valeurs
        }
    }

    // Avoir un axe Y plus haut que la valeur max du graph
    private getYMaxValue(maxConsumptionValue: number) {
        return maxConsumptionValue + (maxConsumptionValue * 10) / 100;
    }
}
