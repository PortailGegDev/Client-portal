import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRequestsHighlightComponent } from '../../components/highlight/highlight.component';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-requests-new-request',
  imports: [PanelModule, AppRequestsHighlightComponent],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.scss'
})
export class AppRequestsNewRequestComponent {

  constructor(private router: Router) { }

  goToRescission() {
    this.router.navigate(['/requests/rescission']);
  }

  goToRelocation() {
    this.router.navigate(['/requests/relocation']);
  }

  goToPowerModification() {
    this.router.navigate(['/requests/power-modification']);
  }

  goToReclamation() {
    this.router.navigate(['/requests/reclamation']);
  }
}
