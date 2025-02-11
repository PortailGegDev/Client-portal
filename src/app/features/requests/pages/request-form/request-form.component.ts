import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../../../shared/utils/constants';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-requests-form-rescission',
  imports: [CommonModule, ReactiveFormsModule, PanelModule, InputTextModule, ButtonModule, EditorModule, SelectModule],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class AppRequestsFormComponent implements OnInit {
  title: string = 'Demande de résiliation';
  requestType: string = '';
  reclamationMotifs: any[] | undefined;
  form!: FormGroup;

  get lastNameForm(): any { return this.form.get('lastName'); }
  get firstNameForm(): any { return this.form.get('firstName'); }
  get emailForm(): any { return this.form.get('email'); }
  get refClientForm(): any { return this.form.get('clientRef'); }

  get isReclamation(): boolean { return this.requestType=== Constants.DemandeType.RECLAMATION; }

  get isRelocation(): boolean { return this.requestType=== Constants.DemandeType.RELOCATION; }

  get isRescision(): boolean { return this.requestType=== Constants.DemandeType.RESCISION; }

  get lastModificationPower(): boolean { return this.requestType=== Constants.DemandeType.POWER_MODIFICATION; }


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.requestType = this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 1].path;
    this.title = this.getPageTitle(this.requestType);
  }

  ngOnInit() {
    this.reclamationMotifs = Constants.ReclamationMotif;
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      clientRef: [''],
      address: [''],
      postalCode: [''],
      city: [''],
      reclamationMotif: [''],
      message: [''],
    });
  }

  submitDemande() {
    if (!this.form.valid) {
      return;
    }

    console.log(this.form.value)
  }



  RetourEnBack() {
    this.router.navigate(['requests', 'new']);
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

  private getPageTitle(requestType: string): string {
    if (requestType === Constants.DemandeType.POWER_MODIFICATION) {
      return Constants.DemandeTitle.POWER_MODIFICATION;

    } else if (requestType === Constants.DemandeType.RECLAMATION) {
      return Constants.DemandeTitle.RECLAMATION;

    } else if (requestType === Constants.DemandeType.RELOCATION) {
      return Constants.DemandeTitle.RELOCATION;

    } else {
      return Constants.DemandeTitle.RESCISION;
    }
  }
}

