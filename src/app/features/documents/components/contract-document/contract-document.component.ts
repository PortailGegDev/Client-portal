import { CommonModule } from '@angular/common';
import { Component, effect, Input, Signal } from '@angular/core';
import { AppDocumentsJustifBoxComponent } from '../justif-box/justif-box.component';
import { formatDateFr } from '../../../../shared/utils/date-utilities';
import { Constants } from '../../../../shared/utils/constants';
import { DocGeneratorService } from '../../../../shared/services/doc-generator.service';
import { Contract } from '../../../../shared/models/contract/contract.model';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-documents-contract-document',
  imports: [CommonModule, AppDocumentsJustifBoxComponent],
  templateUrl: './contract-document.component.html',
  styleUrl: './contract-document.component.scss'
})
export class AppDocumentsContractDocumentComponent {

  @Input() contract: Contract | undefined = undefined;
  currentUser: User | null = null;

  documents = [
    { title: 'Justificatif de domicile', type: Constants.ContractSupportingDoc.DOMICILE, date: formatDateFr(new Date()) },
    { title: 'Grille tarifaire Tarif Base', type: Constants.ContractSupportingDoc.GRILLE_TARIFAIRE_TARIF_BASE, date: formatDateFr(new Date()) },
    { title: 'Certificat de garantie d`origine', type: Constants.ContractSupportingDoc.GARANTIE_ORIGINE, date: formatDateFr(new Date()) },
    { title: 'CGV', type: Constants.ContractSupportingDoc.CGV, date: `${(new Date()).getFullYear()} Tarif Base` }
  ];

  constructor(private authService: AuthService,
    private docGeneratorService: DocGeneratorService) {
    effect(() => {
      this.currentUser = this.authService.currentUSer();
    });
  }

  downloadJustificatif(contractJustificatifType: string) {
    debugger
    switch (contractJustificatifType) {
      case Constants.ContractSupportingDoc.DOMICILE:
        if (!this.currentUser || !this.contract) {
          return;
        }

        this.docGeneratorService.downloadJustifDomicilePDF(this.currentUser!, this.contract);

        break;
    }
  }
}
