import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ContractService } from '../../../core/services/contract.service';

@Component({
  selector: 'app-active-contract',
  imports: [CommonModule, BadgeModule, PanelModule, FormsModule, SelectModule],
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

  constructor(private contractService: ContractService) { }

  ngOnInit() {
    this.contractService.getContracts().subscribe({
      next: (contracts) => {
        this.contracts = contracts;

        if (contracts.length > 0) { 
          this.selectedContract = contracts[0] 
          

        }
      }
    });
  }
}
