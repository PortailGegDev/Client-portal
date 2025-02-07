import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-documents-contracts-list',
  imports: [CommonModule, BadgeModule, PanelModule, MessageModule],
  templateUrl: './contracts-list.component.html',
  styleUrl: './contracts-list.component.scss'
})
export class AppDocumentsContractsListComponent implements OnChanges {
  @Input() contracts: any[] = [];

  get activeContracts(): any[] {
    return this.contracts ? this.contracts.filter(item => item.ContractStatus === 'ACTIF') : [];
  }

  get ceasedContracts(): any[] {
    return this.contracts ? this.contracts.filter(item => item.ContractStatus !== 'ACTIF') : [];
  }

  get activeContractCount(): number {
    return this.activeContracts.length;
  }

  get ceasedContractCount(): number {
    return this.ceasedContracts.length;
  }

  ngOnChanges(): void {

  }
}
