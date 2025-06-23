import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, Signal, signal } from '@angular/core';
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
import { AppRequestsRequestSendedComponent } from '../../components/request-sended/request-sended.component';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { AppRequestsHighlightComponent } from '../../components/highlight/highlight.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { RequestService } from '../../../../shared/services/request.service';
import { RequestRecission } from '../../../../shared/models/request-rescission.model';
import { Address } from '../../../../shared/models/address.model';

@Component({
  selector: 'app-requests-form-rescission',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PanelModule, InputTextModule, ButtonModule, SelectModule, TextareaModule, DatePickerModule, MultiSelectModule, InputNumberModule, AppRequestsRequestSendedComponent, AppRequestsHighlightComponent],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})

export class AppRequestsFormComponent implements OnInit {
  title: string = 'Demande de résiliation';
  requestType: string = '';
  reclamationMotifs: any[] | undefined;
  form!: FormGroup;
  contractList: Contract[] = [];
  requestSended: boolean = false;
  shouldShowGasReading: boolean = false;
  shouldShowElectricityReading: boolean = false;

  currentUser = signal<User | undefined>(undefined);
  contracts: Signal<Contract[]>;

  get lastNameForm(): any { return this.form.get('lastName'); }
  get firstNameForm(): any { return this.form.get('firstName'); }
  get emailForm(): any { return this.form.get('email'); }
  get phoneForm(): any { return this.form.get('phone'); }
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
  get selectedContractForm(): any { return this.form.get('selectedContract'); }
  get relocationAdresseNouveauLogementForm(): any { return this.form.get('relocationAdresseNouveauLogement'); }

  get isReclamation(): boolean { return this.requestType === Constants.DemandeType.RECLAMATION; }
  get isRelocation(): boolean { return this.requestType === Constants.DemandeType.RELOCATION; }
  get isRescission(): boolean { return this.requestType === Constants.DemandeType.RESCISSION; }
  get lastModificationPower(): boolean { return this.requestType === Constants.DemandeType.POWER_MODIFICATION; }


  constructor(private router: Router,
    private authService: AuthService, private contractService: ContractService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private requestService: RequestService) {

    this.requestType = this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 1].path;

    this.title = this.getPageTitle(this.requestType);
    this.contracts = this.contractService.contracts;
  }

  ngOnInit() {
    this.reclamationMotifs = Constants.ReclamationMotif;
    this.buildForm();
    this.currentUser.set(this.authService.getUserData());
    this.initForm();
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
      rescissionStreetNumber: [{ value: '', disabled: true }, Validators.required],
      rescissionStreet: [{ value: '', disabled: true }, Validators.required],
      rescissionPostalCode: [{ value: '', disabled: true }, Validators.required],
      rescissionCity: [{ value: '', disabled: true }, Validators.required],
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
      selectedContract: [''],
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
      this.setControlRequired('selectedContract');
    }

    if (this.isRelocation) {
      this.setControlRequired('relocationadresseDeLogement');
      this.setControlRequired('relocationadresseFacture')
      this.setControlRequired('selectedContract');
      this.setControlRequired('rescissionDepartureDate');
    }

    this.selectedContractForm?.valueChanges.subscribe((value: any) => {

      if (value.length === 0) {
        this.clearRescissionAddress();
      }

      if (!this.isRescission) {
        return;
      }

      this.shouldShowGasReading = value.BusinessSector === Constants.EnergyType.GAZ;
      this.shouldShowElectricityReading = value.BusinessSector === Constants.EnergyType.ELECTRICITY;

      this.initRescissionAddress(); // remplir les champs
    });
  }

  initForm() {
    const user = this.currentUser();
    if (user) {
      this.lastNameForm.setValue(user.lastname);
      this.firstNameForm.setValue(user.firstname);
      this.emailForm.setValue(user.email);
    }
  }

  initRescissionAddress() {
    const selectedContracts = this.selectedContractForm?.value;

    if (selectedContracts) {
      this.rescissionStreetNumberForm.setValue(selectedContracts.HouseNumber);
      this.rescissionStreetForm.setValue(selectedContracts.StreetName);
      this.rescissionPostalCodeForm.setValue(selectedContracts.PostalCode);
      this.rescissionCityForm.setValue(selectedContracts.CityName);
    }
  }

  clearRescissionAddress() {
    this.rescissionStreetNumberForm.reset();
    this.rescissionStreetForm.reset();
    this.rescissionPostalCodeForm.reset();
    this.rescissionCityForm.reset();
  }

  submitDemande() {
    if (!this.form.valid) {
      return;
    }
    
    if (this.isRescission) {
      this.requestService.createRescissionRequest(this.getRescissionFormDate()).subscribe({
        next: (response: any) => {
          this.requestSended = true;
        },
        error: (error) => {
          console.error(`erreur lors d'envoie de demande`, error);
        }
      });
    }
  }

  getRescissionFormDate(): RequestRecission {
    return {
      contractISU: this.selectedContractForm.value?.ContractISU,
      firstName: this.firstNameForm.value,
      lastName: this.lastNameForm.value,
      email: this.emailForm.value,
      phone: this.phoneForm.value,
      departureDate: this.rescissionDepartureDateForm.value,
      referenceClient: this.refClientForm.value,
      requestReason: "",
      dataUsageConsent: "true",
      billingAddress: {
        street: `${this.rescissionInvoiceStreetNumberForm.value} ${this.rescissionInvoiceStreetForm.value}`,
        postalCode: this.rescissionInvoicePostalCodeForm.value,
        city: this.rescissionInvoiceCityForm.value
      } as Address,
      resiliationAddress: {
        street: `${this.rescissionStreetNumberForm.value} ${this.rescissionStreetForm.value}`,
        postalCode: this.rescissionPostalCodeForm.value,
        city: this.rescissionCityForm.value,
      } as Address
    } as RequestRecission;
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

  getContractLabel(contract: Contract): string {
    let contractLabel = '';
    if (contract.BusinessSector === Constants.EnergyType.ELECTRICITY) {
      contractLabel = Constants.EnergyType.ELECTRICITY_LABEL;
    }
    else {
      contractLabel = Constants.EnergyType.GAZ_LABEL;
    }
    contractLabel += ` - ${contract.HouseNumber} ${contract.StreetName} ${contract.PostalCode} ${contract.CityName}`;
    return contractLabel;
  }

  getSelectedContractLabel(): string {
    if (this.selectedContractForm?.value) {
      return this.getContractLabel(this.selectedContractForm.value);
    }

    return '';
  }

}

