import { Component, Input } from '@angular/core';
import { Contract } from '../../../../shared/models/contract.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-documents-contract-header',
  imports: [CommonModule,TableModule,Button],
  templateUrl: './contract-header.component.html',
  styleUrl: './contract-header.component.scss'
})
export class AppDocumentsContractHeaderComponent {
  @Input() contracts: Contract[] = [];


  get contract(): Contract {
    return this.contracts.length > 0 ? this.contracts[0] : { ContractISU: 'N/A' } as Contract;
  }
}
