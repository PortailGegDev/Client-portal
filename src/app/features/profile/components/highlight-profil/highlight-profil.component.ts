import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-highlight-profil',
  imports: [],
  templateUrl: './highlight-profil.component.html',
  styleUrl: './highlight-profil.component.scss'
})
export class AppProfileHighlightProfilComponent {

  constructor( private router : Router){
  }

    navigateToService() {
    this.router.navigate(['/services/serenity-electricity']);
  }
}
