import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-consumption-activation-dialog',
  imports: [ButtonModule],
  templateUrl: './activation-dialog.component.html',
  styleUrl: './activation-dialog.component.scss'
})
export class AppConsumptionActivationDialogComponent {
@Output() onCloseActivationDialog:EventEmitter<void> = new EventEmitter();
}
