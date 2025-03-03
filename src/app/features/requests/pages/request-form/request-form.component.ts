import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../../../../shared/utils/constants';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../core/http-services/auth.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContractService } from '../../../../shared/services/contract.service';
import { map } from 'rxjs';
import { Contract } from '../../../../shared/models/contract-partner.model';


interface City {
  name: string;
  code: string;
}


@Component({
  selector: 'app-requests-form-rescission',
  imports: [CommonModule, ReactiveFormsModule, PanelModule, InputTextModule, ButtonModule, SelectModule, TextareaModule, DatePickerModule, MultiSelectModule],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class AppRequestsFormComponent implements OnInit {
  title: string = 'Demande de résiliation';
  requestType: string = '';
  reclamationMotifs: any[] | undefined;
  form!: FormGroup;
  cities: City[] | undefined;
  selectedCity: City | undefined;
  contracts: any[] = [];
  currentUser = signal<User | undefined>(undefined);

  get lastNameForm(): any { return this.form.get('lastName'); }
  get firstNameForm(): any { return this.form.get('firstName'); }
  get emailForm(): any { return this.form.get('email'); }
  get refClientForm(): any { return this.form.get('clientRef'); }
  get addressForm(): any { return this.form.get('address'); }
  get postalCodeForm(): any { return this.form.get('postalCode'); }
  get cityForm(): any { return this.form.get('city'); }
  get reclamationMotifForm(): any { return this.form.get('reclamationMotif'); }
  get messageForm(): any { return this.form.get('message'); }
  get puissanceForm(): any { return this.form.get('puissance'); }
  get tarifForm(): any { return this.form.get('tarif'); }
  get rescissionStreetNumberForm(): any { return this.form.get('rescissionStreetNumber'); }
  get rescissionStreetForm(): any { return this.form.get('rescissionStreet'); }
  get rescissionPostalCodeForm(): any { return this.form.get('rescissionPostalCode'); }
  get rescissionCityForm(): any { return this.form.get('rescissionCity'); }
  get rescissionInvoiceStreetNumberForm(): any { return this.form.get('rescissionInvoiceStreetNumber'); }
  get rescissionInvoiceStreetForm(): any { return this.form.get('rescissionInvoiceStreet'); }
  get rescissionInvoicePostalCodeForm(): any { return this.form.get('rescissionInvoicePostalCode'); }
  get rescissionInvoiceCityForm(): any { return this.form.get('rescissionInvoiceCity'); }
  get rescissionDepartureDateForm(): any { return this.form.get('rescissionDepartureDate'); }
  get rescissionContractForm(): any { return this.form.get('rescissionContract'); }
  get hpReadingForm(): any { return this.form.get('hpReading'); }
  get hcReadingForm(): any { return this.form.get('hcReading'); }
  get gazReadingForm(): any { return this.form.get('gazReading'); }
  get rescisionForm(): any { return this.form.get('rescision'); }
  get relocationadresseDeLogementForm(): any { return this.form.get('relocationadresseDeLogement'); }
  get relocationadresseFactureForm(): any { return this.form.get('relocationadresseFacture'); }
  get relocationContratForm(): any { return this.form.get('relocationContrat'); }
  get relocationAdresseNouveauLogementForm(): any { return this.form.get('relocationAdresseNouveauLogement'); }




  get isReclamation(): boolean { return this.requestType === Constants.DemandeType.RECLAMATION; }
  get isRelocation(): boolean { return this.requestType === Constants.DemandeType.RELOCATION; }
  get isRescission(): boolean { return this.requestType === Constants.DemandeType.RESCISSION; }
  get lastModificationPower(): boolean { return this.requestType === Constants.DemandeType.POWER_MODIFICATION; }


  constructor(private router: Router,
    private authService: AuthService,private contractService: ContractService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.requestType = this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 1].path;

    this.title = this.getPageTitle(this.requestType);
  }

  ngOnInit() {
    const bp = this.authService.getUserData()?.bp;
    console.log('bp', bp)

    // Décommenter tous les lignes commentées pour gérer l'exception d'avoir un compte sans bp
    if (!bp) {
      // console.error('Pas de bp lié à cet utilisateur');
      // return;
    }

    this.contractService.getAllBpContracts(bp!).subscribe({
      next: (contracts) => {
        console.log('Données brutes reçues:', contracts); 
    
        this.contracts = contracts.map((contract) => {
          console.log('Contrat avant mapping:', contract); 
          
          return {
            name: contract.AddressCompteur, 
            code: contract.ContractISU 
          };
        });
        
    
        console.log('Contracts après mapping:', this.contracts);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contrats:', err);
      }
    });
    
    
    this.reclamationMotifs = Constants.ReclamationMotif;
    this.buildForm();
    this.currentUser.set(this.authService.getUserData());
    this.initForm();

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  buildForm() {
    this.form = this.formBuilder.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: true }],
      clientRef: [''],
      address: [''],
      postalCode: [''],
      city: [''],
      reclamationMotif: [''],
      message: [''],
      refPCE: [''],
      rescissionStreetNumber: [''],
      rescissionStreet: [''],
      rescissionPostalCode: [''],
      rescissionCity: [''],
      rescissionInvoiceStreetNumber: [''],
      rescissionInvoiceStreet: [''],
      rescissionInvoicePostalCode: [''],
      rescissionInvoiceCity: [''],
      rescissionDepartureDate: [''],
      rescissionContract: [''],
      hpReading: [''],
      hcReading: [''],
      gazReading: [''],
      puissance: [''],
      tarif: [''],
      relocationadresseDeLogement: [''],
      relocationadresseFacture: [''],
      relocationContrat: [''],
      relocationAdresseNouveauLogement: ['']
    });


    if (this.isReclamation) {
      this.setControlRequired('address');
      this.setControlRequired('postalCode');
      this.setControlRequired('reclamationMotif');
      this.setControlRequired('message');
      this.setControlRequired('city');
    }

    if (this.lastModificationPower) {
      this.setControlRequired('puissance');
      this.setControlRequired('tarif');
      this.setControlRequired('puissance');
      this.setControlRequired('tarif');
    }

    if (this.isRescission) {
      this.setControlRequired('rescissionStreetNumber');
      this.setControlRequired('rescissionStreet');
      this.setControlRequired('rescissionPostalCode');
      this.setControlRequired('rescissionCity');
      this.setControlRequired('rescissionInvoiceStreetNumber');
      this.setControlRequired('rescissionInvoiceStreet');
      this.setControlRequired('rescissionInvoicePostalCode');
      this.setControlRequired('rescissionInvoiceCity');
      this.setControlRequired('rescissionDepartureDate');
      this.setControlRequired('rescissionContract');
    }
    if (this.isRelocation) {
      this.setControlRequired('relocationadresseDeLogement');
      this.setControlRequired('relocationadresseFacture')
      this.setControlRequired('relocationContrat');
      this.setControlRequired('rescissionDepartureDate');
    }
  }


  initForm() {
    const user = this.currentUser();
    if (user) {
      this.lastNameForm.setValue(user.lastname);
      this.firstNameForm.setValue(user.firstname);
      this.emailForm.setValue(user.email);
    }
  }

  submitDemande() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value)
  }

  setControlRequired(formControlName: string) {
    this.form.get(formControlName)?.setValidators([Validators.required]);
    this.form.get(formControlName)?.updateValueAndValidity();
  }

  RetourEnBack() {
    this.router.navigate(['requests', 'new']);
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
      return Constants.DemandeTitle.RESCISSION;
    }
  }

}

