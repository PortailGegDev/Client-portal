import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-profile-details',
  imports: [FormsModule, CommonModule, PanelModule, ButtonModule],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class AppProfileDetailsComponent {
  @Input() person: any = null;

  isEditMode: boolean = false;
  email = 'eugenie.verret@gmail.com'; // Initial email value
  phone = '+33 6 65 43 22 11'; // Initial phone value
  isOverlayVisible: boolean = false;
  contactsWithAccess: string[] = [];

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }

  showOverlay(): void {
    this.isOverlayVisible = true;
  }

  saveEdit() {
    this.isEditMode = false;
  }

  cancelEdit() {
    this.isEditMode = false;
    // Here you can add logic to revert the changes if necessary
  }
}
