import { CommonModule } from '@angular/common';
import { Component, effect, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { AuthService } from '../../../../core/http-services/auth.service';
import { ContractService } from '../../../../shared/services/contract.service';
import { AppDocumentsContractsComponent } from '../../components/contracts/contracts.component';
import { Contract } from '../../../../shared/models/contract.model';
import { ContractDetails } from '../../../../shared/models/contract-details.model';

@Component({
  selector: 'app-documents',
  imports: [CommonModule, TabsModule, AppDocumentsContractsComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class AppDocumentsComponent {
  showDetails = false;
  selectedContract: any = null;
  currentSection: string = 'contrat'; // Par défaut, afficher la section "Contrat"
  contracts: Signal<Contract[]>;
  allContracts: ContractDetails[] = [];

  constructor(private router: Router,
    private authService: AuthService,
    private contractService: ContractService) {
    this.contracts = this.contractService.contracts;

    effect(() => {
      debugger
      if (this.contracts()) {
        const contractsISUList = this.contracts().map(item => item.ContractISU);

        this.loadContract(contractsISUList);
      }
    });
  }

  private loadContract(contractsISUList: string[]) {
    this.contractService.getContractsByContractISUList(contractsISUList).subscribe({

      next: (contracts: ContractDetails[]) => {
        this.allContracts = contracts;
        console.log(contracts);
      }
    });
  }

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


  viewDetails(item: any) {
    this.router.navigate(['/documents/contract-details']);
  }

  backToList() { }
}
