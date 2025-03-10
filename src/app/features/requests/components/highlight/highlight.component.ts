import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests-highlight',
  imports: [],
  templateUrl: './highlight.component.html',
  styleUrl: './highlight.component.scss'
})
export class AppRequestsHighlightComponent {

  constructor(private router: Router) { }

  goToRelocation() {
    this.router.navigate(['/requests/relocation']);
  }

  goToFaq() {
    this.router.navigate(['/requests/frequently-asked-questions']);
  }

  goToCustomerService() {

  }
}
