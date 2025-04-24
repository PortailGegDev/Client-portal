import { Component, OnInit, Signal } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { InvoicesService } from '../../services/invoices.service';
import { Invoice } from '../../../../shared/models/invoice-model';
import { Constants } from '../../../../shared/utils/constants';

@Component({
  selector: 'app-invoices-paypage-result',
  imports: [PanelModule, ButtonModule],
  templateUrl: './paypage-result.component.html',
  styleUrl: './paypage-result.component.scss'
})
export class AppInvoicesPaypageResultComponent implements OnInit {

  orderId: string = '';
  status: string | undefined = '';
  currentUser: Signal<User | null>;
  invoice: Invoice | undefined;

  get getTypeText(): string {
    if (!this.invoice) {
      return '';
    }

    if(this.invoice.Energy === Constants.EnergyType.ELECTRICITY){
      return `d'électricité `;
    } else{
      return 'de gaz '
    }
  }

  constructor(
    private authService: AuthService,
    private invoicesService: InvoicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.currentUser = this.authService.currentUSer;
  }

  ngOnInit() {
    this.activatedRoute.params.pipe().subscribe(params => {
      this.orderId = params['invoiceNumber'];
      this.loadInvoices(this.orderId);
    });
  }

  private loadInvoices(utilitiesInvoicingDocument: string) {
    this.invoicesService.getInvoiceByUtilitiesInvoicingDocument(utilitiesInvoicingDocument).subscribe({
      next: (invoice: Invoice[]) => {
        this.invoice = invoice[0];
      }
    });
  }

  navigateToFacturePage() {
    this.router.navigate(['invoices']);
  }

  // private async checkPaymentResult(invoicesNumber: string) {
  //   this.paymentService.checkPaymentResult(invoicesNumber).pipe(delay(3000)).subscribe({
  //     next: (status: any | undefined) => {
  //       console.log(status.status);
  //       this.status = status.status;

  //       if (this.status !== 'PAIEMENT EN COURS') {
  //         this.router.navigate(['invoices']);
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Erreur lors du paiement :', error);
  //     }
  //   });
  // }
}
