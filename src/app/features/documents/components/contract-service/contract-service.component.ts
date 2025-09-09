import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-documents-contract-service',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './contract-service.component.html',
  styleUrl: './contract-service.component.scss'
})
export class AppDocumentsContractServiceComponent {
constructor(private router:Router){}
  

  boxData: any[] = [
    {
      status: 'souscrit',
      price: '2,99€/mois',
      service: 'assistance dépannage',
      title: 'Sérénité Electricité',
      icon: '/images/Icons (1).png',
      backgroundImage: '/images/service_contrat.jpg',
      link: '/services/serenity-electricity'
    }

  ];
  navigateToServices(): void {
    this.router.navigate(['/services']);
  }
}
