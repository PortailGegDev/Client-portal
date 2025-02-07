import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
@Component({
  selector: 'app-mes-preferences',
  imports: [FormsModule,ToggleSwitch],
  templateUrl: './mes-preferences.component.html',
  styleUrl: './mes-preferences.component.scss'
})
export class AppMesPreferencesComponent {
  checked: boolean = false;
}
