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

  viewDetail() {
    this.router.navigate(['/pages/demande-de-resiliation']);
  }
}
