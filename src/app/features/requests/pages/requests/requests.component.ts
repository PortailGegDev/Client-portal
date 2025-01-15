import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  imports: [],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class AppRequestsComponent {
  constructor(private router: Router){}
  view() {
    this.router.navigate(['/requests/rescission']);
  }
  viewCreateDemande() {
    this.router.navigate(['/requests/new']);
  }

}
