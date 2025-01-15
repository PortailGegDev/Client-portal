import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ContractService } from '../../../../core/http-services/contrat.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
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


  contracts = [
    { id: 1, name: 'Valentin Verret' },
    { id: 2, name: 'Pauline Verret' },
    { id: 3, name: 'Jean Dupont' }
  ];
  accessDetails = [
    { address: '16 rue Pierre Larousse, 75014 Paris', number: 'n° 1234567', details: 'Electricité - Base - 9kVA' },
    { address: '20 rue de la Paix, 75002 Paris', number: 'n° 7654321', details: 'Gaz - Base - 12kVA' }
  ];
  constructor(
    private router: Router, 
    private renderer: Renderer2, 
    private elRef: ElementRef, 
    private service: ContractService
  ) { }

  ngOnInit() {
    this.fetchPerson();
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
  fetchPerson(): void {
    this.service.fetchPerson().subscribe(
      data => {
        console.log('Données reçues:', data);
        if (data?.d?.results?.length > 0) {
          this.person = data.d.results[0]; // Récupère la première personne
          this.email = this.generateEmail(this.person.FirstName, this.person.LastName);

        } else {
          console.error('Aucune donnée trouvée.');
          this.person = null;
        }
      },
      error => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
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
  email = 'eugenie.verret@gmail.com'; // Initial email value
  phone = '+33 6 65 43 22 11'; // Initial phone value
  generateEmail(firstName: string, lastName: string): string {
    if (firstName && lastName) {
      // Nettoyer les noms pour éviter les espaces ou majuscules
      const emailFirstName = firstName.toLowerCase().replace(/\s+/g, '');
      const emailLastName = lastName.toLowerCase().replace(/\s+/g, '');
      return `${emailFirstName}.${emailLastName}@gmail.com`;
    }
    return 'email.inconnu@gmail.com'; // Valeur par défaut si aucune donnée
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
