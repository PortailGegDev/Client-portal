import { Component, computed, effect, EventEmitter, Output, signal, Signal } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { AuthService } from '../../../core/http-services/auth.service';
import { Contract } from '../../models/contract/contract.model';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { SelectButton } from 'primeng/selectbutton';
import { Constants } from '../../utils/constants';

@Component({
  selector: 'app-active-contract',
  templateUrl: './active-contract.component.html',
  imports: [CommonModule, BadgeModule, PanelModule, FormsModule, SelectModule, SelectButton],
  styleUrls: ['./active-contract.component.scss'],
})
export class ActiveContractComponent  {
  Constants = Constants;
  theme: string = '';
  gazElecValue = signal<string>('');
  actifCesse = signal<string>('');
  
  typeGazElecOptions = [
    { label: Constants.EnergyType.ELECTRICITY_LABEL, value: Constants.EnergyType.ELECTRICITY},
    { label: Constants.EnergyType.GAZ_LABEL, value: Constants.EnergyType.GAZ },
  ];

  statusOptions = [
    { label: 'Actif', value: 'ACTIF' },
    { label: 'Cessé', value: 'RESIL' },
  ];

  // Utilisez les signaux du ContractService
  contracts: Signal<Contract[]>;
  selectedContract: Signal<Contract | null>;
  selectedContractValue?: Contract | null;

  filteredContracts = computed(() => {
    let filtered = this.contracts();
  
    if (this.gazElecValue()) {
      filtered = filtered.filter(c => c.BusinessSector === this.gazElecValue());
    }
  
    if (this.actifCesse()) {
      filtered = filtered.filter(c => c.ContractStatus === this.actifCesse());
    }
  
    return filtered;
  });

  get contractCount(): number {
    return this.contracts().length;
  }

  get haveSameTypeOfContracts(): boolean {
    return this.contracts().every((item) => item.BusinessSector === this.contracts()[0].BusinessSector);
  }

  get haveSameStatusOfContracts(): boolean {
    return this.contracts().every((item) => item.ContractStatus === this.contracts()[0].ContractStatus);
  }

  constructor(private contractService: ContractService, private authService: AuthService) {
    this.contracts = this.contractService.contracts;
    this.selectedContract = this.contractService.selectedContract;

    effect(() => {
      this.selectedContractValue = this.selectedContract();
    });
  }

  onChangeContract(event: any) {
    this.contractService.changeContract(event.value);
    this.contractService.updateSelectedPartnerContract(event.value.PartnerFct !=='00000001');
  }

  filterContracts() {

    if (this.filteredContracts().length > 0) {
      this.contractService.changeContract(this.filteredContracts()[0]);
    } else {
      this.contractService.changeContract(null);
    }

    console.log('Contrats filtrés :', this.filteredContracts());
  }
}