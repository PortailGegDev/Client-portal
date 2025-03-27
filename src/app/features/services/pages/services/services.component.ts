import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ContractHttpService } from '../../../../core/http-services/contrat-http.service';
import { CommonModule } from '@angular/common';
import { ActiveContractComponent } from '../../../../shared/components/active-contract/active-contract.component';


@Component({
  selector: 'app-services',
  imports: [CommonModule,ActiveContractComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class AppServicesComponent {
 

  boxData: any[] = [
    {
      status: 'souscrit',
      price: '2,99€/mois',
      service: 'assistance dépannage',
      title: 'Sérénité Electricité',
      icon: '/images/Icons (1).png',

      backgroundImage: '/images/service_contrat.jpg'

    },
    {
      status: 'souscrit',
      price: '2,99€/mois',
      service: 'assistance dépannage',
      title: 'Sérénité Electricité',
      icon: '/images/Icons (1).png',
      backgroundImage: '/images/Service2.jpg'

    },
    {
      status: 'souscrit',
      price: '2,99€/mois',
      service: 'assistance dépannage',
      title: 'Sérénité Electricité, Gaz<br>Plomberie',
      icon: '/images/Icons (1).png',
      backgroundImage: '/images/service3.jpg'

    },
    {
      status: 'souscrit',
      price: '1€-2,99€/mois ',
      service: 'assistance dépannage',
      title: 'Option verte',
      icon: '/images/Icons (1).png',

      backgroundImage: '/images/service4.jpg'

    },

    {
      status: 'souscrit',
      price: 'Gratuit',
      service: 'Service',
      title: 'E-Facture',
      icon: '/images/Icons (1).png',
      badgeIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
      backgroundImage: '/images/service_facture.jpg'
    },
    {
      status: 'souscrit',
      price: 'Gratuit',
      service: 'Service',
      title: 'Facture en papier',
      icon: '/images/Icons (1).png',
      badgeIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
      backgroundImage: '/images/service6.jpg'
    },

    {
      status: 'souscrit',
      price: 'Gratuit',
      service: 'Service',
      title: 'Arrondis solidaires',
      icon: '/images/Icons (1).png',
      badgeIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
      backgroundImage: '/images/service7.jpg'
    },
  ];

}
