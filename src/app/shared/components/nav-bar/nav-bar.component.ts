import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DeminingIconComponent } from '../demining/demining-icon.component';
import { HelpContactIconComponent } from '../help-contact-icon/help-contact-icon.component';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/http-services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [MenubarModule, ButtonModule, SplitButton, RouterModule, DeminingIconComponent, HelpContactIconComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [
    { label: 'Accueil', routerLink: ['/home'] },
    { label: 'Consommation', routerLink: ['/consumption'] },
    { label: 'Factures', routerLink: ['/invoices'] },
    { label: 'Documents', routerLink: ['/documents'] },
    { label: 'Services', routerLink: ['/services'] }
  ];

  aideContactItems: MenuItem[] = [
    { label: 'Créer une demande', icon: 'fa fa-solid fa-plus', routerLink: ['/requests/new'] },
    { separator: true },
    { label: 'Mes demandes', icon: 'fa fa-solid fa-list', routerLink: ['/requests'] },
    { separator: true },
    { label: 'Questions fréquentes', icon: 'fa fa-solid fa-question', routerLink: ['requests/frequently-asked-questions'] },
  ];

  profilItems: MenuItem[] = []

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.profilItems = [
      {
        label: `${this.authService.getCurrentUser()?.firstname} ${this.authService.getCurrentUser()?.lastname}`,
        icon: 'fa-regular fa-user', 
        styleClass: 'profile'
      },
      { label: 'Mon profil' },
      { separator: true },
      { label: 'Me déconnecté' }
    ];
  }

  navigateHome() {

  }

  logout() {

  }
}
