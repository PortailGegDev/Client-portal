import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Facture } from '../../../../shared/models/facture-model';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../../shared/models/user.model';
import { DocGeneratorService } from '../../services/doc-generator.service';

@Component({
  selector: 'app-home-documents',
  imports: [CommonModule, PanelModule, TimeSpanToDatePipe, ButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class AppHomeDocumentsComponent {
  @Input() lastInvoice: Facture | null = null;
  @Input() selectedContract: any | null = null;
  @Input() currentUser: User | undefined = undefined;

  constructor(private router: Router,
    private docGeneratorService: DocGeneratorService
  ) { }

  payFacture(facture: Facture): void {
    if (facture.StatusInvoicingDocument === "Non Soldée") {
      console.log("Paiement de la facture en cours...");
    }
  }

  downloadPDF(facture: Facture): void {
    if (facture.StatusInvoicingDocument === "Totalement Soldée") {
      console.log("Téléchargement du PDF de la facture...");
    }
  }

  downloadJustifPDF() {
    if(!this.currentUser || !this.selectedContract){
      return;
    }

    this.docGeneratorService.downloadJustifDomicilePDF(this.currentUser!, this.selectedContract);
  }

  navigateToDocument() {
    this.router.navigate(["/documents"]);
  }
}
