import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
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

@Component({
  selector: 'app-profile-details',
  imports: [FormsModule, CommonModule, PanelModule, ButtonModule, DialogModule, AppProfileAccessDialogComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class AppProfileDetailsComponent {
  @Input() profils: Profil[] = [];

  userSubscription: Subscription | null = null;
  isEditMode: boolean = false;
  email = 'eugenie.verret@gmail.com'; // Initial email value
  phone = '+33 6 65 43 22 11'; // Initial phone value
  accessdialogVisible: boolean = false;
  contactsWithAccess: string[] = [];
  currentUser: User | null = null;

  constructor (  private authService: AuthService, private profileService: ProfilService){}
  ngOnInit(){
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
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

  closeAccessDialog(){
    this.accessdialogVisible = false;
  }
}
