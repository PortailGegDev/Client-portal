import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ContractService } from '../../services/contract.service';
import { AuthService } from '../../../core/http-services/auth.service';
import { SelectButton } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-active-contract',
  imports: [CommonModule, BadgeModule, PanelModule, FormsModule, SelectModule,SelectButton],
  templateUrl: './active-contract.component.html',
  styleUrl: './active-contract.component.scss'
})
export class ActiveContractComponent implements OnInit {

  theme: string = "";
  selectedContract: any = null;
  contracts: any[] = [];
  filteredContracts: any[] = [];


  get contractCount(): number {
    return this.contractService.contracts.length;
  }

  get haveSameTypeOfContracts(): boolean {
    return this.contracts.every(item=> item.BusinessSectorText === this.contracts[0].BusinessSectorText)  ;
  }

  get haveSameStatusOfContracts(): boolean {
    return this.contracts.every(item=> item.ContractStatus === this.contracts[0].ContractStatus)  ;
  }

  constructor(private contractService: ContractService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    
    const bp = this.authService.getUserData()?.bp;
    console.log('bp',bp)

    // Décommenter tous les lignes commentées pour gérer l'exception d'avoir un compte sans bp
    if (!bp) {
      // console.error('Pas de bp lié à cet utilisateur');
      // return;
    }

    this.contractService.getAllBpContracts(bp!).subscribe({
    
      next: (contracts) => {
        this.contracts = contracts;

        this.filteredContracts=contracts;
        console.log(contracts);

        if (this.filterContracts.length > 0) {
          this.selectedContract = this.filteredContracts[0]
        }
      }
    });
  }



  onChangeContract(event: any) {
    this.selectedContract = event.value
    this.contractService.changeContract(this.selectedContract);
    
  }

  gazElecValue: string ='';
  typeGazElecOptions = [
    { label: 'Électricité', value: 'Electricité' },
    { label: 'Gaz', value: 'Gaz' }
  ];
  actifCesse: string='';
  statusOptions = [
    { label: 'Actif', value: 'ACTIF' },
    { label: 'Cessé', value: 'CESSÉ' },
  ];

  filterContracts(event: any) {
   
    let filtered = this.contracts;


    if (this.gazElecValue) {
      filtered = filtered.filter(
        contract => contract.BusinessSectorText === this.gazElecValue
      );
    }

    if (this.actifCesse) {
      filtered = filtered.filter(
        contract => contract.ContractStatus === this.actifCesse
      );
    }
    this.filteredContracts = filtered;
    if (this.filteredContracts.length > 0) {
      this.selectedContract = this.filteredContracts[0];
    } else {
      this.selectedContract = null;
    }
    console.log("Filtered contracts: ", this.filteredContracts);
  }

  
}


