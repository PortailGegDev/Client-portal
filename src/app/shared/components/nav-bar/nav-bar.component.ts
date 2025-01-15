import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DeminingIconComponent } from '../demining/demining-icon.component';
import { HelpContactIconComponent } from '../help-contact-icon/help-contact-icon.component';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/http-services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-nav-bar',
  imports: [MenubarModule, ButtonModule, SplitButton, RouterModule, DeminingIconComponent, HelpContactIconComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {
  userSubscription: Subscription | null = null;
  currentUser: User | null = null;

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
    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      console.log('User info updated:', user);
    });
  }

  ngOnInit() {
    console.log(this.authService.getCurrentUser());
    this.profilItems = [
      {
        label: `${this.currentUser?.firstname} ${this.currentUser?.lastname}`,
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

  ngOnDestroy() {
    // Se désabonner lorsque le composant est détruit
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
