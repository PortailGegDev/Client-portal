import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests-rescission',
  imports: [CommonModule],
  templateUrl: './rescission.component.html',
  styleUrl: './rescission.component.scss'
})
export class AppRequestsRescissionComponent {
  constructor(private router: Router) { }

  addresses: string[] = [
    "16 rue Pierre Larousse, 75014 Paris",
    "12 avenue des Champs-Élysées, 75008 Paris",
    "45 boulevard Montmartre, 75002 Paris",
    "28 rue de Rivoli, 75001 Paris",
    "7 place de la République, 75011 Paris"
  ];

  electricityOptions: string[] = [
    "Electricité 3 kVA",
    "Electricité 6 kVA",
    "Electricité 8 kVA",
    "Electricité 9 kVA",
    "Electricité 12 kVA",
    "Electricité 15 kVA"
  ];


  RetourEnBack() {
    this.router.navigate(['/pages/creer-une-demande']);
  }
  selectedDate: Date | null = null; // Variable pour stocker la date sélectionnée
  isDateSelected: boolean = false; // État pour vérifier si une date est sélectionnée

  // Méthode appelée lorsque la date change
  onDateChange(event: any) {
    console.log('Date sélectionnée:', event.value); // Affichez la valeur de l'événement
    this.selectedDate = new Date(event.value); // Convertir en objet Date
    console.log('selectedDate:', this.selectedDate); // Affichez la date sélectionnée
    this.isDateSelected = true; // Indiquez qu'une date a été sélectionnée
  }

  isSubmitted: boolean = false;

  // Fonction appelée lors du clic sur le bouton "Envoyer la demande"
  onSubmit() {
    this.isSubmitted = true; // Changez l'état pour afficher le message
  }

  viewDetail() {
    this.router.navigate(['/requests']);
  }
}
