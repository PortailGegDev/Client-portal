import { Component, computed, effect, Signal } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { AuthService } from '../../../core/http-services/auth.service';
import { Contract } from '../../models/contract.model';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-active-contract',
  templateUrl: './active-contract.component.html',
  imports: [CommonModule, BadgeModule, PanelModule, FormsModule, SelectModule, SelectButton],
  styleUrls: ['./active-contract.component.scss'],
})
export class ActiveContractComponent  {
  theme: string = '';
  gazElecValue: string = '';
  actifCesse: string = '';

  typeGazElecOptions = [
    { label: 'Électricité', value: 'Electricité' },
    { label: 'Gaz', value: 'Gaz' },
  ];

  statusOptions = [
    { label: 'Actif', value: 'ACTIF' },
    { label: 'Cessé', value: 'CESSÉ' },
  ];

  // Utilisez les signaux du ContractService
  contracts: Signal<Contract[]>;
  selectedContract: Signal<Contract | null>;
  selectedContractValue?: Contract | null;

  // Filtrage des contrats
  filteredContracts = computed(() => {
    let filtered = this.contracts();

    if (this.gazElecValue) {
      filtered = filtered.filter((contract) => contract.BusinessSectorText === this.gazElecValue);
    }

    if (this.actifCesse) {
      filtered = filtered.filter((contract) => contract.ContractStatus === this.actifCesse);
    }

    return filtered;
  });

  get contractCount(): number {
    return this.contracts().length;
  }

  get haveSameTypeOfContracts(): boolean {
    return this.contracts().every((item) => item.BusinessSectorText === this.contracts()[0].BusinessSectorText);
  }

  get haveSameStatusOfContracts(): boolean {
    return this.contracts().every((item) => item.ContractStatus === this.contracts()[0].ContractStatus);
  }

  constructor(private contractService: ContractService, private authService: AuthService) {
    this.contracts = this.contractService.contracts;
    this.selectedContract = this.contractService.selectedContract;

    effect(() => {
      this.selectedContractValue = this.contractService.selectedContract();
    });
  }

  onChangeContract(event: any) {
    debugger
    this.contractService.changeContract(event.value);
  }

  filterContracts() {
    // Le filtrage est géré par le computed `filteredContracts`
    if (this.filteredContracts().length > 0) {
      this.contractService.changeContract(this.filteredContracts()[0]);
    } else {
      this.contractService.changeContract(null);
    }

    console.log('Contrats filtrés :', this.filteredContracts());
  }
}