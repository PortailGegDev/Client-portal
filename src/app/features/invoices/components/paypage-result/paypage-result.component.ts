import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-invoices-paypage-result',
  imports: [],
  templateUrl: './paypage-result.component.html',
  styleUrl: './paypage-result.component.scss'
})
export class AppInvoicesPaypageResultComponent implements OnInit {

  orderId: string = '';
  status: string | undefined = '';

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.pipe().subscribe(params => {
      this.orderId = params['invoiceNumber'];

      this.checkPaymentResult(this.orderId);
    });
  }

  private async checkPaymentResult(invoicesNumber: string) {
    this.paymentService.checkPaymentResult(invoicesNumber).pipe(delay(3000)).subscribe({
      next: (status: any | undefined) => {
        console.log(status.status);
        this.status = status.status;

        if (this.status !== 'PAIEMENT EN COURS') {
          this.router.navigate(['invoices']);
        }
      },
      error: (error) => {
        console.error('Erreur lors du paiement :', error);
      }
    });
  }
}
