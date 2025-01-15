import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lodgement-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './lodgement-details.component.html',
  styleUrl: './lodgement-details.component.scss'
})
export class AppProfileLodgementDetailsComponent implements OnInit {
  selectedType: string = '';
  selectedHeating: string = '';
  superficie: number = 0;
  nombreHabitants: number = 0;
  selectedPv: string = '';
  nombrePanneaux: number = 0;
  selectedPvv: string = '';
  selectedCar: string = '';


  ngOnInit(): void {
    const savedType = localStorage.getItem('selectedType');
    const savedHeating = localStorage.getItem('selectedHeating');
    const savedSuperficie = localStorage.getItem('superficie');
    const savedNombreHabitants = localStorage.getItem('nombreHabitants');
    const savedPv = localStorage.getItem('selectedPv');


    if (savedType) {
      this.selectedType = savedType; // Récupère la sélection enregistrée pour selectedType
    }
    if (savedHeating) {
      this.selectedHeating = savedHeating; // Récupère la sélection enregistrée pour selectedHeating
    }
    if (savedPv) {
      this.selectedPv = savedPv;
    }
    this.superficie = savedSuperficie ? +savedSuperficie : 75; // Utiliser une valeur par défaut si rien n'est trouvé
    this.nombreHabitants = savedNombreHabitants ? +savedNombreHabitants : 4;

    // TODO : A voir avec Manar
    // this.nombrePanneaux =+ localStorage.getItem('nombrePanneaux') || 4;

    this.selectedPvv = localStorage.getItem('selectedPvv') || '';
    this.selectedCar = localStorage.getItem('selectedCar') || '';

  }
  constructor(private router: Router) { }
  RetourEnBack() {
    this.router.navigate(['/pages/profil']);
  }

  selectType(type: string): void {
    this.selectedType = type;
    localStorage.setItem('selectedType', type);  // Enregistrer la sélection
  }
  selectHeating(heating: string) {
    this.selectedHeating = heating;
    localStorage.setItem('selectedHeating', heating);  // Enregistrer la sélection

  }

  navigateToService() {
    this.router.navigate(['/pages/service']);
  }
  selectPv(value: string): void {
    this.selectedPv = value;
    localStorage.setItem('selectedPv', value);
  }
  selectPvv(value: string): void {
    this.selectedPvv = value;
    localStorage.setItem('selectedPvv', value);
  }

  // Gérer la sélection pour la voiture électrique
  selectCar(value: string): void {
    this.selectedCar = value;
    localStorage.setItem('selectedCar', value);
  }
  saveChanges(key: string, value?: string): void {
    if (value) {
      localStorage.setItem(key, value);
    }
  }

  saveSelection() {
    // Ici, vous pouvez implémenter la logique pour enregistrer la sélection
    console.log('Type de logement sélectionné:', this.selectedType);
    console.log('Type de chauffage sélectionné:', this.selectedHeating);
    console.log('Superficie:', this.superficie);
    console.log('Nombre d\'habitants:', this.nombreHabitants);
    console.log('Avez-vous des panneaux photovoltaïques ?', this.selectedPv);
    console.log('Nombre de panneaux:', this.nombrePanneaux);
    console.log('Avez-vous Une voiture électrique ?', this.selectedCar);
    console.log('Avez-vous Une piscine ?', this.selectedPvv);


  }
}
