import { Component, Input, OnChanges } from '@angular/core';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { ContractDetails } from '../../../../shared/models/contract/contract-details.model';
import { ContractService } from '../../../../shared/services/contract.service';
import { TooltipModule } from 'primeng/tooltip';
import { Constants } from '../../../../shared/utils/constants';

@Component({
  selector: 'app-documents-contract-header',
  imports: [CommonModule, TableModule, Button, PanelModule, TooltipModule],
  templateUrl: './contract-header.component.html',
  styleUrl: './contract-header.component.scss'
})
export class AppDocumentsContractHeaderComponent implements OnChanges {
  @Input() contractDetails: ContractDetails | undefined;
  @Input() contract: Contract | undefined;

  coTitulairesList: string[] = [];
  Constants = Constants;

  constructor(private contractService: ContractService) { }

  ngOnChanges(): void {
    if (this.contractDetails) {
      this.contractService.getContractCotitulaire(this.contractDetails.ContractISU).subscribe({
        next: (contracts: Contract[]) => {
          this.coTitulairesList = contracts.map(item => item.PayerFullName);
        }
      });
    }
  }
}
