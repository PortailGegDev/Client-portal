import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../../../shared/utils/constants';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-requests-form-rescission',
  imports: [CommonModule, ReactiveFormsModule, PanelModule, InputTextModule, ButtonModule],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class AppRequestsFormComponent implements OnInit {
  title: string = 'Demande de résiliation';
  demandeType: string = '';
  form!: FormGroup;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.demandeType = this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 1].path;
    this.title = this.getPageTitle(this.demandeType);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      LastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      clientRef: ['', Validators.required]
    });
  }

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

  private getPageTitle(demandeType: string): string {
    if (demandeType === Constants.DemandeType.POWER_MODIFICATION) {
      return Constants.DemandeTitle.POWER_MODIFICATION;
    } else if (demandeType === Constants.DemandeType.RECLAMATION) {
      return Constants.DemandeTitle.RECLAMATION;

    } else if (demandeType === Constants.DemandeType.RELOCATION) {
      return Constants.DemandeTitle.RELOCATION;

    } else {
      return Constants.DemandeTitle.RESCISION;
    }
  }
}

