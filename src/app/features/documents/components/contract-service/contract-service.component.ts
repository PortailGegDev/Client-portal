import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documents-contract-service',
  imports: [CommonModule,FormsModule],
  templateUrl: './contract-service.component.html',
  styleUrl: './contract-service.component.scss'
})
export class AppDocumentsContractServiceComponent {

  

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
      price: 'Gratuit',
      service: 'Service',
      title: 'E-facture',
      icon: '/images/Icons (1).png',
      badgeIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#1E1E1E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>',
      backgroundImage: '/images/service_facture.jpg'
    }

  ];

}
