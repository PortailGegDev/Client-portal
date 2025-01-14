import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-serenity-electricity',
  imports: [],
  templateUrl: './serenity-electricity.component.html',
  styleUrl: './serenity-electricity.component.scss'
})
export class SerenityElectricityComponent {

  constructor(private router: Router) { }

  RetourEnBack() {
    this.router.navigate(['/pages/service']);
  }
}
