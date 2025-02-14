import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ContractService } from '../../services/contract.service';
import { AuthService } from '../../../core/http-services/auth.service';
import { SelectButton } from 'primeng/selectbutton';

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

  get contractCount(): number {
    return this.contractService.contracts.length;
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

    this.contractService.getContracts(bp!).subscribe({
    
      next: (contracts) => {
        this.contracts = contracts;
        console.log(contracts);


        if (contracts.length > 0) {
          this.selectedContract = contracts[0]
        }
      }
    });
  }

  onChangeContract(event: any) {
    this.selectedContract = event.value
    this.contractService.changeContract(this.selectedContract);
  }

  value1! : string;
  value2 : string = 'Beginner';
  value3 : string = 'Expert';
  options: any[] = [
      { label: 'Elec', value: '1' },
      { label: 'Gaz', value: '2' },
  ];


  
}


