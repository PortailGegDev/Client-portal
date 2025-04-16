import { Component, Input, Signal } from '@angular/core';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';

@Component({
  selector: 'app-documents-contract-header',
  imports: [CommonModule,TableModule,Button,PanelModule],
  templateUrl: './contract-header.component.html',
  styleUrl: './contract-header.component.scss'
})
export class AppDocumentsContractHeaderComponent {
  @Input() contractDetails: ContractDetails | undefined;
  @Input() contract: Contract | undefined;
 


  // get contract(): ContractDetails {
  //   return this.contracts.length > 0 ? this.contracts[0] : { ContractISU: 'N/A' } as ContractDetails;
  // }
}
