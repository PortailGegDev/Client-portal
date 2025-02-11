import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests-new-request',
  imports: [],
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.scss'
})
export class AppRequestsNewRequestComponent {
  
  constructor(private router: Router){}

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
