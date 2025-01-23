import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Facture } from '../../../../shared/models/facture-model';
import { convertSAPDate } from '../../../../shared/utils/date-utilities';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-documents',
  imports: [CommonModule, PanelModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class AppHomeDocumentsComponent implements OnChanges {
  @Input() lastInvoice: Facture | null = null;
  lastInvoiceData: { statut: string; TotalAmountHT: string; date: string | null } | null = null;

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.lastInvoice) {
      this.lastInvoiceData = {
        statut:
          this.lastInvoice!.StatusInvoicingDocument === "Non Soldée"
            ? "A payer"
            : this.lastInvoice!.StatusInvoicingDocument === "Totalement Soldée"
              ? "payer"
              : "Autre statut",
        date: convertSAPDate(this.lastInvoice!.PostingDate),
        TotalAmountHT: this.lastInvoice!.TotalAmount
      };
      console.log("Dernière facture:", this.lastInvoice); // Vérification dans la console

    }
  }

  payFacture(facture: { statut: string; TotalAmountHT: string; date: string | null }): void {
    if (facture.statut === "A payer") {
      console.log("Paiement de la facture en cours...");
    }
  }

  downloadPDF(facture: { statut: string; TotalAmountHT: string; date: string | null }): void {
    if (facture.statut === "payer") {
      console.log("Téléchargement du PDF de la facture...");
    }
  }

  navigateToDocument() {
    this.router.navigate(["/documents"]);
  }
}
