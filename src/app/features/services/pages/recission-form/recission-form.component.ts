import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { Constants } from '../../../../shared/utils/constants';

@Component({
  selector: 'app-services-recission-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, PanelModule, ButtonModule, CheckboxModule,InputTextModule],
  templateUrl: './recission-form.component.html',
  styleUrl: './recission-form.component.scss'
})
export class AppServicesRecissionFormComponent implements OnInit {
  form!: FormGroup;
  formTitle: string = 'Formulaire';
  boxId!: string;
  isSubscribed: boolean = false;
  box: any;
    constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {}


  get lastNameForm(): any { return this.form.get('lastName'); }
  get firstNameForm(): any { return this.form.get('firstName'); }
  get emailForm(): any { return this.form.get('email'); }
  get phoneForm(): any { return this.form.get('phone'); }
  get streetNumberForm(): any { return this.form.get('streetNumber'); }
  get streetForm(): any { return this.form.get('street'); }
  get postalCodeForm(): any { return this.form.get('postalCode'); }
  get cityForm(): any { return this.form.get('city'); }
  get acceptConditionsForm(): any { return this.form.get('acceptConditions');}
  get subscribeContractForm(): any { return this.form.get('subscribeContract');}
  get personalDataForm(): any { return this.form.get('personalData');}


 ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.boxId = params['boxId'];
    const action = params['action']; // 'subscribe' ou 'recission'

    // Récupérer la box
    this.box = (Constants.BoxData || []).find(b => b.id === this.boxId) || { status: '' };

    // Déterminer l’état du formulaire selon l’action
    this.isSubscribed = action === 'recission';
    this.formTitle = this.isSubscribed ? 'Résiliation de service' : 'Souscription d’un service';

    this.buildForm();
  });
}

  buildForm() {
    this.form = this.formBuilder.group({
      firstName: [{ value: '', disabled: this.isSubscribed }, Validators.required],
      lastName: [{ value: '', disabled: this.isSubscribed }, Validators.required],
      email: [{ value: '', disabled: this.isSubscribed }, [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: this.isSubscribed }],
      streetNumber: ['', Validators.required],
      street: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: [''],
      // Cases à cocher seulement si souscription
      acceptConditions: [false, this.isSubscribed ? [] : Validators.requiredTrue],
      subscribeContract: [false, this.isSubscribed ? [] : Validators.requiredTrue],
      personalData: [false, this.isSubscribed ? [] : Validators.requiredTrue]
    });
  }

  submitDemande() {
    if (!this.form.valid) return;

    if (this.isSubscribed) {
      console.log('Résiliation demandée pour', this.boxId);
    } else {
      console.log('Souscription demandée pour', this.boxId);
    }
  }
  RetourEnBack() {
    this.router.navigate(['services']);
  }
}
