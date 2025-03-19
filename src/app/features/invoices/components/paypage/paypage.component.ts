import { Component, ElementRef, Renderer2 } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { PaymentData } from '../../../../shared/models/payment-data.model';
import { ActivatedRoute } from '@angular/router';
import { PaymentRedirection } from '../../../../shared/models/payment-redirection.model';

@Component({
  selector: 'app-invoices-paypage',
  imports: [],
  templateUrl: './paypage.component.html',
  styleUrl: './paypage.component.scss'
})
export class AppInvoicesPaypageComponent {
  orderId: string = '';
  amount: number = 0;

  constructor(
    private paymentService: PaymentService,
    private renderer: Renderer2,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
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
      next: (response: PaymentRedirection | undefined) => {
        if (response) {
          this.createAndSubmitForm(response);
        }
      }
    });
  }

  createAndSubmitForm(response: PaymentRedirection): void {
    // Créer un formulaire dynamiquement
    const form = this.renderer.createElement('form');
    this.renderer.setAttribute(form, 'method', 'post');
    this.renderer.setAttribute(form, 'action', response.redirectionUrl);
    this.renderer.setStyle(form, 'display', 'none');

    // Ajouter les champs cachés
    const versionInput = this.renderer.createElement('input');
    this.renderer.setAttribute(versionInput, 'type', 'hidden');
    this.renderer.setAttribute(versionInput, 'name', 'redirectionVersion');
    this.renderer.setProperty(versionInput, 'value', response.redirectionVersion);
    this.renderer.appendChild(form, versionInput);

    const dataInput = this.renderer.createElement('input');
    this.renderer.setAttribute(dataInput, 'type', 'hidden');
    this.renderer.setAttribute(dataInput, 'name', 'redirectionData');
    this.renderer.setProperty(dataInput, 'value', response.redirectionData);
    this.renderer.appendChild(form, dataInput);

    // Ajouter le formulaire au DOM
    this.renderer.appendChild(this.el.nativeElement, form);

    // Soumettre le formulaire
    form.submit();

    // Supprimer le formulaire après soumission
    this.renderer.removeChild(this.el.nativeElement, form);
  }
}
