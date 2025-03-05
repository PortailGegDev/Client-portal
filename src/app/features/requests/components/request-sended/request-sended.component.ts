import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-requests-request-sended',
  imports: [ButtonModule],
  templateUrl: './request-sended.component.html',
  styleUrl: './request-sended.component.scss'
})
export class AppRequestsRequestSendedComponent {

  constructor(private router: Router) { }

  goToRequestPage() {
    this.router.navigate(['requests']);
  }
}
