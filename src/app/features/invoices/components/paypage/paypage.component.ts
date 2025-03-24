import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { PaymentData } from '../../../../shared/models/payment-data.model';
import { ActivatedRoute } from '@angular/router';
import { PaymentRedirection } from '../../../../shared/models/payment-redirection.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-invoices-paypage',
  imports: [],
  templateUrl: './paypage.component.html',
  styleUrl: './paypage.component.scss'
})
export class AppInvoicesPaypageComponent implements OnInit {

  redirectionUrl: string = '';
  redirectionVersion: string = '';
  redirectionData: string = '';

  orderId: string = '';
  amount: number = 0;
  isLoading: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.orderId = params['invoiceNumber'];
      this.amount = params['amount'];

      this.initiatePayment(this.orderId, this.amount);
    });
  }

  initiatePayment(orderId: string, amount: number): void {

    const paymentData: PaymentData = {
      orderId: orderId,
      amount: amount
    }

    this.paymentService.initiatePayment(paymentData).subscribe({
      next: (paymentRedirectionData: PaymentRedirection | undefined) => {

        if (paymentRedirectionData) {
          this.submitPaymentData(paymentRedirectionData);
        }
      },
      error: (error) => {
        console.error('Erreur lors du paiement :', error);
      }
    });
  }

  private submitPaymentData(paymentRedirectionData: PaymentRedirection): void {
    const form = document.createElement('form');
    form.method = 'post';
    form.action = paymentRedirectionData.redirectionUrl;
    form.style.display = 'none';

    const versionInput = document.createElement('input');
    versionInput.type = 'hidden';
    versionInput.name = 'redirectionVersion';
    versionInput.value = paymentRedirectionData.redirectionVersion;

    const dataInput = document.createElement('input');
    dataInput.type = 'hidden';
    dataInput.name = 'redirectionData';
    dataInput.value = paymentRedirectionData.redirectionData;

    form.appendChild(versionInput);
    form.appendChild(dataInput);
    document.body.appendChild(form);
    form.submit();
  }
}
