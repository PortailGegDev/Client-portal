import { CommonModule } from '@angular/common';
import { Component, Input, Signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { PanelModule } from 'primeng/panel';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { ContractService } from '../../../../shared/services/contract.service';

@Component({
  selector: 'app-documents-contract-invoice',
  imports: [CommonModule,TableModule,PanelModule],
  templateUrl: './contract-invoice.component.html',
  styleUrl: './contract-invoice.component.scss'
})
export class AppDocumentsContractInvoiceComponent {
  @Input() contract: Contract | undefined;
    // @Input() contracts: Signal<Contract[]>;

    // constructor(private contractService: ContractService){
    //   this.contracts = this.contractService.contracts;
    // }
}
