import { Component, ElementRef, Renderer2 } from '@angular/core';
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


@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, TabsModule, CardModule, PanelModule, AppProfileDetailsComponent,AppMesLogementsComponent,AppMesPreferencesComponent],
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
  person: any = null; // Objet pour stocker les données de la personne

  profil: Profil | undefined;


  constructor(
    private router: Router, 
    private renderer: Renderer2, 
    private elRef: ElementRef, 
    private profileService: ProfilService
  ) { }

  ngOnInit() {
    const bp = '1510060117';  // ID de test, remplace par une variable dynamique si nécessaire
    this.loadProfil(bp);
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
    this.profileService.getProfil(bp).subscribe({
      next: (data: any) => {
        this.profil = data;  // Stocker les profils reçus
        console.log('Profils chargés:', this.profil); // Vérification dans la console
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des profils:', error);
        this.profil = undefined; // Réinitialiser en cas d'erreur
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
