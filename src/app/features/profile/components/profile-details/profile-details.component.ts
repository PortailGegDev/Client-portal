import { CommonModule } from '@angular/common';
import { Component, effect, Input, OnChanges, OnInit, Signal, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { AppProfileAccessDialogComponent } from '../access-dialog/access-dialog.component';
import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../core/http-services/auth.service';
import { Subscription } from 'rxjs';
import { ProfilService } from '../../../../shared/services/profil.service';
import { Profil } from '../../../../shared/models/profil.model';
import { SalesforceContact } from '../../../../shared/models/salsforceContact.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-profile-details',
  imports: [FormsModule, CommonModule, PanelModule, ButtonModule, DialogModule, AppProfileAccessDialogComponent,ToastModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
  providers: [MessageService]
})
export class AppProfileDetailsComponent implements OnChanges {
  @Input() profil: Profil | undefined;

  currentUser: Signal<User | null>;

  user: User | null = null;
  isEditMode: boolean = false;
  contactPhone: string | null = null;
  dateNaissance: string | null = null;
  accessdialogVisible: boolean = false;
  contactsWithAccess: string[] = [];
  email: string = '';
  contact: SalesforceContact | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profil'] && this.profil?.BusinessPartner) {
      this.getContactByBp();
    }
  }
  constructor(private authService: AuthService,  private messageService: MessageService,
    private profileService: ProfilService) {
    this.currentUser = this.authService.currentUSer;

    effect(() => {
      this.user = this.currentUser();
      this.email = this.currentUser()?.email || '';
    });
  }
  
  getContactByBp() {
    const bp = this.profil?.BusinessPartner;
    if (bp) {
      this.profileService.getContactByBp(bp).subscribe({
        next: (contact: SalesforceContact) => {
          this.contact = contact;
          console.log('Contact récupéré :', contact);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du contact :', error);
        }
      });
    } else {
      console.warn('BusinessPartner est indéfini');
    }
  }

  savePhoneNumber() {
    if (!this.profil?.BusinessPartner || !this.contactPhone) {
      this.messageService.add({
        severity: 'error',
        summary: 'Oups !',
        detail: `Numéro de téléphone invalide.`
      });
      return;
    }
  
    this.profileService.updatePhoneNumberByBusinessPartner(this.profil.BusinessPartner, this.contactPhone)
      .subscribe({
        next: () => {
          // Récupérer le contact mis à jour
          this.profileService.getContactByBp(this.profil!.BusinessPartner!)
            .subscribe({
              next: (updatedContact: SalesforceContact) => {
                this.contact = updatedContact;
                this.contactPhone = updatedContact.MobilePhone || '';
                this.isEditMode = false;
  
                this.messageService.add({
                  severity: 'success',
                  summary: 'Opération réussie',
                  detail: `Mise à jour du numéro de téléphone réussie !`
                });
              },
            });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Oups !',
            detail: `Échec de la mise à jour du numéro de téléphone.`
          });
        }
      });
  }
  
  hasShownPhoneError: boolean = false;

  validatePhone(value: string) {
    const onlyDigits = /^[0-9]*$/;
  
    if (!onlyDigits.test(value)) {
      if (!this.hasShownPhoneError) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Le numéro de téléphone ne peut contenir que des chiffres.'
        });
        this.hasShownPhoneError = true;
      }
      this.contactPhone = value.replace(/\D/g, '');
    } else {
      // Reset du flag si entrée valide
      this.hasShownPhoneError = false;
    }
  }  
  
  contracts = [
    { id: 1, name: 'Valentin Verret' },
    { id: 2, name: 'Pauline Verret' },
    { id: 3, name: 'Jean Dupont' }
  ];

  accessDetails = [
    { address: '16 rue Pierre Larousse, 75014 Paris', number: 'n° 1234567', details: 'Electricité - Base - 9kVA' },
    { address: '20 rue de la Paix, 75002 Paris', number: 'n° 7654321', details: 'Gaz - Base - 12kVA' }
  ];


  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  showAccessdialog(): void {
    this.accessdialogVisible = true;
  }

  saveEdit() {
    this.isEditMode = false;
  }

  cancelEdit() {
    this.isEditMode = false;
    // Here you can add logic to revert the changes if necessary
  }

  closeAccessDialog() {
    this.accessdialogVisible = false;
  }
}
