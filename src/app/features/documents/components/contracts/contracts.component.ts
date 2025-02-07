import { Component, Input } from '@angular/core';
import { AppDocumentsContractsListComponent } from '../contracts-list/contracts-list.component';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents-contracts',
  imports: [CommonModule, BadgeModule, PanelModule, AppDocumentsContractsListComponent],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})
export class AppDocumentsContractsComponent {
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

  get groupedActiveContracts(): { key: string; value: any[] }[] {
    const grouped = this.groupBy(this.activeContracts, 'AddressCompteur');
    return Object.entries(grouped).map(([key, value]) => ({ key, value }));
  }

  get groupedCeasedContracts(): { key: string; value: any[] }[] {
    const grouped = this.groupBy(this.ceasedContracts, 'AddressCompteur');
    return Object.entries(grouped).map(([key, value]) => ({ key, value }));
  }

  private groupBy(array: any[], key: string): { [key: string]: any[] } {
    return array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {} as { [key: string]: any[] });
  }
}
