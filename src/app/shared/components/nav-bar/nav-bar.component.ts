import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [MenubarModule, ButtonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  items: any[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Accueil', routerLink: ['/home'] },
      { label: 'Consommation', routerLink: ['/consumption'] },
      { label: 'Factures', routerLink: ['/invoices'] },
      { label: 'Documents', routerLink: ['/documents'] },
      { label: 'Services', routerLink: ['/services'] }];
  }

  navigateHome(){
    
  }
}
