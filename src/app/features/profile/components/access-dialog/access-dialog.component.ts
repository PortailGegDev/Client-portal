import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-profile-access-dialog',
  imports: [ButtonModule, SelectModule, FormsModule, MultiSelectModule],
  templateUrl: './access-dialog.component.html',
  styleUrl: './access-dialog.component.scss'
})
export class AppProfileAccessDialogComponent {
  @Input() contracts: any[] = [];
  @Input() accessDetails: any[] = [];
  @Output() onCloseAccessDialog: EventEmitter<void> = new EventEmitter();

  selectedContract: any = null;
  selectedAccess: any[] = [];
  contactsWithAccess: string[] = [];

  onSendAccountCreation() {
    if (this.selectedContract) {
      // Vérifier si le contact est déjà dans la liste
      if (!this.contactsWithAccess.includes(this.selectedContract.name)) {
        this.contactsWithAccess.push(this.selectedContract.name);
        localStorage.setItem('contactsWithAccess', JSON.stringify(this.contactsWithAccess));
      }
      this.onCloseAccessDialog.emit();
    }
  }
}
