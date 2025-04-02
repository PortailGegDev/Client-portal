import { Component, Input } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { AppDocumentsJustifBoxComponent } from '../justif-box/justif-box.component';
import { CommonModule } from '@angular/common';
import { Constants } from '../../../../shared/utils/constants';

@Component({
  selector: 'app-documents-justificatifs',
  imports: [CommonModule, MessageModule, PanelModule, AppDocumentsJustifBoxComponent],
  templateUrl: './justificatifs.component.html',
  styleUrl: './justificatifs.component.scss'
})
export class AppDocumentsJustificatifsComponent {
  @Input() contracts: any[] = [];
  currentDate: string = new Date().toLocaleDateString('fr-FR');
  Constants = Constants;
  
  get groupedContracts(): { key: string; value: any[] }[] {
    const grouped = this.groupBy(this.contracts, 'AddressCompteur');
    return Object.entries(grouped).map(([key, value]) => ({ key, value }));
  }

  private groupBy(array: any[], key: string): { [key: string]: any[] } {
    return array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {} as { [key: string]: any[] });
  }
}
