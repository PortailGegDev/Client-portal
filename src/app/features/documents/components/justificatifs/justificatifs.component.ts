import { Component, Input } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { AppDocumentsJustifBoxComponent } from '../justif-box/justif-box.component';
import { CommonModule } from '@angular/common';
import { Constants } from '../../../../shared/utils/constants';
import { DocGeneratorService } from '../../../../shared/services/doc-generator.service';
import { User } from '../../../../shared/models/user.model';
import { Contract } from '../../../../shared/models/contract.model';

@Component({
  selector: 'app-documents-justificatifs',
  imports: [CommonModule, MessageModule, PanelModule, AppDocumentsJustifBoxComponent],
  templateUrl: './justificatifs.component.html',
  styleUrl: './justificatifs.component.scss'
})
export class AppDocumentsJustificatifsComponent {
  @Input() allContracts: any[] = [];
  @Input() currentUser: User | null = null;
  @Input() contracts: Contract[] = [];

  currentDate: string = new Date().toLocaleDateString('fr-FR');
  Constants = Constants;

  constructor(private docGeneratorService: DocGeneratorService) { }

  get groupedContracts(): { key: string; value: any[] }[] {
    const grouped = this.groupBy(this.allContracts, 'AddressCompteur');
    return Object.entries(grouped).map(([key, value]) => ({ key, value }));
  }

  downloadJustif(contractIsu: any) {
    const selectedContract = this.contracts.find(item=>item.ContractISU === contractIsu);
    
    if (!this.currentUser || !selectedContract) {
      return;
    }

    this.docGeneratorService.downloadJustifDomicilePDF(this.currentUser!, selectedContract);
  }

  private groupBy(array: any[], key: string): { [key: string]: any[] } {
    return array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {} as { [key: string]: any[] });
  }
}
