import { Component, effect, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { AppProfileDetailsComponent } from '../../components/profile-details/profile-details.component';
import { ProfilService } from '../../../../shared/services/profil.service';
import { Profil } from '../../../../shared/models/profil.model';
import { AppMesLogementsComponent } from '../../components/mes-logements/mes-logements.component';
import { AppMesPreferencesComponent } from '../../components/mes-preferences/mes-preferences.component';
import { AuthService } from '../../../../core/http-services/auth.service';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, TabsModule, CardModule, PanelModule, AppProfileDetailsComponent, AppMesLogementsComponent, AppMesPreferencesComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class AppProfileComponent {
  currentSection = 'Profil';
  isEditMode: boolean = false;
  isOverlayVisible: boolean = false;
  isOpen = false;
  selectedContract: any = null;
  isAccessOpen = false;
  selectedAccess: any = null;
  contactsWithAccess: string[] = [];
  person: any = null;

  profil: Profil | undefined;


  constructor(
    private authService: AuthService,
    private router: Router, private httpClient: HttpClient,
    private renderer: Renderer2,
    private elRef: ElementRef,
    private profileService: ProfilService
  ) {
    effect(() => {
      const bp = this.authService.businessPartner();

      if (bp) {
        this.loadProfil(bp);
      }
    });
  }

  ngOnInit() {
    // Récupérer le contrat sélectionné depuis le localStorage
    const savedContract = localStorage.getItem('selectedContract');
    if (savedContract) {
      this.selectedContract = JSON.parse(savedContract);
    }

    // Récupérer l'accès sélectionné depuis le localStorage
    const savedAccess = localStorage.getItem('selectedAccess');
    if (savedAccess) {
      this.selectedAccess = JSON.parse(savedAccess);
    }
    const savedContactsWithAccess = localStorage.getItem('contactsWithAccess');
    if (savedContactsWithAccess) {
      this.contactsWithAccess = JSON.parse(savedContactsWithAccess);
    }
  }

  loadProfil(bp: string): void {
    this.profileService.getProfil(bp)
      .pipe(
        map((data: any) => {
          // Récupérer l'objet profil complet (selon ta structure)
          const profil = data.d?.results?.[0] ?? data;
          return profil;  // On renvoie tout le profil
        })
      )
      .subscribe({
        next: (profil: any) => {
          this.profil = profil;
  
          // Afficher le BusinessPartner et tout le profil
          console.log('BusinessPartner:', profil.BusinessPartner);
          console.log('Profil complet:', profil);
          this.testSalesforceAPI();

        },
        error: (error) => {
          console.error('Erreur lors de la récupération des profils:', error);
          this.profil = undefined;
        }
      });
  }
  testSalesforceAPI(): void {
    if (!this.profil?.BusinessPartner) {
      console.error('BusinessPartner non défini');
      return;
    }
    const businessPartner = this.profil.BusinessPartner;
    const url = `/Contact/GEG_eFluid_ID__c/${businessPartner}`;

    this.httpClient.get(url).subscribe({
      next: (data) => {
        console.log('Réponse Salesforce :', data);
      },
      error: (error) => {
        console.error('Erreur appel API Salesforce :', error);
      }
    });
  }

  toggleAccessDropdown() {
    this.isAccessOpen = !this.isAccessOpen;
  }

  selectAccess(access: any) {
    this.selectedAccess = access;
    localStorage.setItem('selectedAccess', JSON.stringify(access));
  }

  get accessOptionClass() {
    return this.isAccessOpen ? 'option expanded' : 'option';
  }

  get optionClass() {
    return this.isOpen ? 'option expanded' : 'option';
  }

  showSection(section: string) {
    this.currentSection = section;
  }


  // Function to toggle edit mode
  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }
  showOverlay(): void {
    this.isOverlayVisible = true;
  }
  selectContract(contract: any) {
    this.selectedContract = contract;
    localStorage.setItem('selectedContract', JSON.stringify(contract));

  }

  validateContract() {
    if (this.selectedContract) {
      console.log('Contract validated:', this.selectedContract);
      this.isOpen = false;

    }
  }
  validateAccess() {
    if (this.selectedAccess) {
      console.log('Access validated:', this.selectedAccess);
      this.isAccessOpen = false;
    }
  }

  hideOverlay(): void {
    this.isOverlayVisible = false;
  }

  saveEdit() {
    this.isEditMode = false;

  }

  // Function to cancel changes and exit edit mode
  cancelEdit() {
    this.isEditMode = false;
    // Here you can add logic to revert the changes if necessary
  }
  viewDetails() {
    this.router.navigate(['/profile/lodgement-details']);
  }
  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.adjustContentPosition();
  }
  adjustContentPosition() {
    const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
    const optionElement = this.elRef.nativeElement.querySelector('.option:nth-of-type(2)'); // L'élément suivant

    if (dropdownMenu && optionElement) {
      const menuHeight = dropdownMenu.offsetHeight;
      if (this.isOpen) {
        this.renderer.setStyle(optionElement, 'margin-top', `${menuHeight}px`);
      } else {
        this.renderer.removeStyle(optionElement, 'margin-top');
      }
    }
  }
  closeOverlay() {
    this.isOverlayVisible = false;
  }
  onSendAccountCreation() {
    if (this.selectedContract) {
      // Vérifier si le contact est déjà dans la liste
      if (!this.contactsWithAccess.includes(this.selectedContract.name)) {
        this.contactsWithAccess.push(this.selectedContract.name);
        localStorage.setItem('contactsWithAccess', JSON.stringify(this.contactsWithAccess));
      }
      this.closeOverlay();
    }
  }
  navigateToService() {
    this.router.navigate(['services']);
  }
}
