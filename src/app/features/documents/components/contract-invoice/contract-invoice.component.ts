import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ContractDetails } from '../../../../shared/models/contract-details.model';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-documents-contract-invoice',
  imports: [CommonModule,TableModule,PanelModule],
  templateUrl: './contract-invoice.component.html',
  styleUrl: './contract-invoice.component.scss'
})
export class AppDocumentsContractInvoiceComponent {
  @Input() contracts: ContractDetails[] = [];
}
