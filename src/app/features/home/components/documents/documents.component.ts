import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Invoice } from '../../../../shared/models/invoice-model';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../../shared/models/user.model';
import { DocGeneratorService } from '../../services/doc-generator.service';
import { InvoicesService } from '../../../../shared/services/invoices.service';

@Component({
  selector: 'app-home-documents',
  imports: [CommonModule, PanelModule, TimeSpanToDatePipe, ButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class AppHomeDocumentsComponent {
  @Input() lastInvoice: Invoice | null = null;
  @Input() selectedContract: any | null = null;
  @Input() currentUser: User | undefined = undefined;

  formattedDate = new Date().toLocaleDateString('fr-FR');

  constructor(private router: Router,
    private docGeneratorService: DocGeneratorService,
    private invoiceService: InvoicesService
  ) { }

  payFacture(invoice: Invoice): void {
    if (invoice.StatusInvoicingDocument === "Non Soldée") {
      console.log("Paiement de la facture en cours...");
    }
  }

  downloadPDF(invoice: Invoice): void {
    if (invoice.StatusInvoicingDocument !== "Totalement Soldée") {
      return;
    }

    this.invoiceService.downloadInvoiceByInvoiceNumber(invoice.ISUContract).subscribe({
      next: (downloadUrl: any) => {
        if (downloadUrl) {
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.target = '_blank';
          a.download = `Facture numéro ${invoice.ISUContract}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          console.error("Aucune URL de téléchargement trouvée.");
        }
      },
      error: (err) => {
        console.error('Erreur de téléchargement...');
      }
    });
  }

  downloadJustifPDF() {
    if (!this.currentUser || !this.selectedContract) {
      return;
    }

    this.docGeneratorService.downloadJustifDomicilePDF(this.currentUser!, this.selectedContract);
  }

  navigateToDocument() {
    this.router.navigate(["/documents"]);
  }
}
