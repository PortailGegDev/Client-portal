import { Component, Input } from '@angular/core';
import { Contract } from '../../../../shared/models/contract.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ContractDetails } from '../../../../shared/models/contract-details.model';

@Component({
  selector: 'app-documents-contract-header',
  imports: [CommonModule,TableModule,Button,PanelModule],
  templateUrl: './contract-header.component.html',
  styleUrl: './contract-header.component.scss'
})
export class AppDocumentsContractHeaderComponent {
  @Input() contracts: ContractDetails[] = [];


  get contract(): ContractDetails {
    return this.contracts.length > 0 ? this.contracts[0] : { ContractISU: 'N/A' } as ContractDetails;
  }
}
