import { Component, effect, OnDestroy } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { DeminingIconComponent } from '../demining/demining-icon.component';
import { HelpContactIconComponent } from '../help-contact-icon/help-contact-icon.component';
import { SplitButton } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../core/http-services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, MenubarModule, ButtonModule, SplitButton, RouterModule, DeminingIconComponent, HelpContactIconComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnDestroy {

  userSubscription: Subscription | null = null;
  currentUser: User | null = null;
  profilItems: MenuItem[] = []

  initalMenuItem: MenuItem[] = [
    { label: 'Accueil', routerLink: ['/home'] },
    { label: 'Consommation', routerLink: ['/consumption'] },
    { label: 'Factures', routerLink: ['/invoices'] }
  ];
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService,
    private contractService: ContractService,
    private router: Router
  ) {
    this.menuItems = this.initalMenuItem;


    this.menuItems = this.initalMenuItem;

    this.menuItems = [
      ...this.menuItems, // Conserve les éléments initiaux
      { label: 'Documents', visible: !this.contractService.contractPartner[0].isPartner, routerLink: ['/documents'] },
      { label: 'Services', visible: !this.contractService.contractPartner[0].isPartner, routerLink: ['/services'] },
      {
        separator: true,
        styleClass: 'menu-spacer'
      },
      {
        label: 'Je déménage',
        routerLink: '/requests/relocation',
        visible: !this.contractService.contractPartner[0].isPartner,
        styleClass: 'right-menu-item'
      },
      {
        label: 'Aide et contact',
        routerLink: '/requests/relocation',
        styleClass: 'right-menu-item',
        visible: !this.contractService.contractPartner[0].isPartner,
        items: [
          { label: 'Créer une demande', icon: 'fa fa-solid fa-plus', routerLink: ['/requests/new'] },
          { separator: true },
          { label: 'Mes demandes', icon: 'fa fa-solid fa-list', routerLink: ['/requests'] },
          { separator: true },
          { label: 'Questions fréquentes', icon: 'fa fa-solid fa-question', routerLink: ['/requests/frequently-asked-questions'] }
        ]
      }
    ];

    this.userSubscription = this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;

      this.profilItems = [
        {
          label: `${this.currentUser?.firstname} ${this.currentUser?.lastname}`,
          icon: 'fa-regular fa-user',
          styleClass: 'profile',
          visible: !this.contractService.contractPartner[0].isPartner
        },
        {
          label: 'Mon profil',
          routerLink: ['/profile']
        },
        { separator: true },
        { label: 'Me déconnecter' }
      ];
    });
  }

  navigateHome() {
    this.router.navigate(['home']);
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
