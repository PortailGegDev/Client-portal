import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-documents',
  imports: [CommonModule, ButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AppDocumentsComponent {
  showDetails = false;
  selectedContract: any = null;
  currentSection: string = 'contrat'; // Par défaut, afficher la section "Contrat"

  showSection(section: string) {
    this.currentSection = section;
  }
  items = [
    {
      contractNumber: 'Contrat n° 1234567',
      electricityType: 'Electricité - Base - 9kVA',
      startDate: 'depuis 16/02/2018',
    },
    {
      contractNumber: 'Contrat n° 122025',
      electricityType: 'Electricité - Base - 10kVA',
      startDate: 'depuis 20/08/2015',
    },
    // Add more example items if needed
  ];

  items1 = [
    {
      contractNumber: 'Attestation de domicile, Contrat Electricté',
      electricityType: 'Electricité - Base - 9kVA',
      startDate: ' 1er Janv. 2023',
    },
    {
      contractNumber: 'Attestation de domicile, Contrat Gaz',
      electricityType: 'Electricité - Base - 10kVA',
      startDate: 'depuis 20/08/2015',
    },
    {
      contractNumber: 'Contrat n° 122025',
      electricityType: 'Electricité - Base - 10kVA',
      startDate: 'depuis 20/08/2015',
    },
  ];
  // Add more example items if needed

  adresses = [
    {
      adresseNum: '16 rue Pierre Larousse, 75014 Paris',
    },
  ];

  titulaires = [
    {
      Titulaire: 'Eugénie Verret',
      IBAN: 'FR 08659483652****75649****9*',
      Signe: '1 Juin 2023',
    },
    {
      Titulaire: 'Eugénie Verret',
      IBAN: 'FR 08659483652****75649****9*',
      Signe: '12 Mai 2023',
    },
  ];

  constructor(private router: Router) {}

  viewDetails(item: any) {
    this.router.navigate(['/pages/details-contrat']);
  }

  backToList() {}
}
