import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AppConsumptionActivationDialogComponent } from '../activation-dialog/activation-dialog.component';

@Component({
  selector: 'app-consumption-activation',
  imports: [ButtonModule, DialogModule, AppConsumptionActivationDialogComponent],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.scss'
})
export class AppConsumptionActivationComponent implements OnChanges {
  @Input() byHours: boolean = true;
  buttonLabel: string = 'Activier la consommation par heure';
  description: string = `Afin d'afficher votre consommation par heure, merci d'activer cette option`;
  dialogTitle: string = 'Activation ma consommation Heure';
  dialogVisible: boolean = false;

  ngOnChanges(): void {
    if (!this.byHours) {
      this.buttonLabel = 'Activier la consommation par jour'
      this.description = `Afin d'afficher votre consommation par jour, merci d'activer cette option`;
      this.dialogTitle = 'Activation ma consommation jour';
    }
  }

  showActivationDialog() {
    this.dialogVisible = true;
  }

  closeActivationDialog(){
    this.dialogVisible = false;
  }
}
