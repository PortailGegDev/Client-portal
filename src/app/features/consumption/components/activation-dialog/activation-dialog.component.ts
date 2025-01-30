import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-consumption-activation-dialog',
  imports: [FormsModule,ButtonModule, CheckboxModule],
  templateUrl: './activation-dialog.component.html',
  styleUrl: './activation-dialog.component.scss'
})
export class AppConsumptionActivationDialogComponent {
  @Output() onCloseActivationDialog: EventEmitter<void> = new EventEmitter();
  authorizationChecked: boolean = false;

  activeConsumption(){
    if(!this.authorizationChecked){
      return;
    }

    // TODO :  Process d'activation de consommation
  }
}
