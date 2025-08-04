import { Component, OnInit, Signal } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { PaymentData } from '../../../../shared/models/payment-data.model';
import { ActivatedRoute } from '@angular/router';
import { PaymentRedirection } from '../../../../shared/models/payment-redirection.model';
import { of, switchMap, take } from 'rxjs';
import { AuthService } from '../../../../core/http-services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-invoices-paypage',
  imports: [PanelModule],
  templateUrl: './paypage.component.html',
  styleUrl: './paypage.component.scss'
})
export class AppInvoicesPaypageComponent implements OnInit {

  redirectionUrl: string = '';
  redirectionVersion: string = '';
  redirectionData: string = '';
  currentUser: Signal<User | null>;
  currentUserEmail: string | undefined = '';
  orderId: string = '';
  productSupplier = '';
  amount: number = 0;
  isLoading: boolean = true;

  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUSer;
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.orderId = params['invoiceNumber'];
      this.amount = params['amount'];
      this.productSupplier = params['productSupplier'];
      this.currentUserEmail = this.currentUser()?.email;

      if (!this.currentUserEmail) {
        console.error('Utilisateur invalide !');
        return;
      }
  
      this.initiatePayment(this.orderId, this.amount, this.currentUserEmail, this.productSupplier);
    });
  }
  

  initiatePayment(orderId: string, amount: number, currentUserEmail: string, productSupplier: string): void {

    const paymentData: PaymentData = {
      orderId: orderId,
      amount: amount,
      userEmail: currentUserEmail,
      productSupplier: productSupplier  

    };

    this.paymentService.initiatePayment(paymentData).subscribe({
      next: (paymentRedirectionData: PaymentRedirection | undefined) => {
        this.isLoading = false;
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
