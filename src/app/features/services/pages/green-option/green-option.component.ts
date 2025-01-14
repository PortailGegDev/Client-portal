import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-green-option',
  imports: [],
  templateUrl: './green-option.component.html',
  styleUrl: './green-option.component.scss'
})
export class AppServicesGreenOptionComponent {

  constructor(private router: Router) { }
  
  RetourEnBack() {
    this.router.navigate(['/pages/service']);
  }
}
