import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  @ViewChild('paypageForm') paypageForm: any;
  redirectionUrl: string = '';
  redirectionVersion: string = '';
  redirectionData: string = '';

  orderId: string = '';
  amount: number = 0;
  executePayment: boolean = false;

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
      next: (response: PaymentRedirection | undefined) => {

        if (response) {
          //this.createAndSubmitForm(response);
          this.redirectionUrl = response.redirectionUrl;
          this.redirectionVersion = response.redirectionVersion;
          this.redirectionData = response.redirectionData;
          this.executePayment = true;

          this.paypageForm.nativeElement.submit();
        }
      },
      error: (error) => {
        console.error('Erreur lors du paiement :', error);
      }
    });
  }

  createAndSubmitForm(response: PaymentRedirection): void {
    // Créer un formulaire dynamiquement
    // const form = this.renderer.createElement('form');
    // this.renderer.setAttribute(form, 'method', 'post');
    // this.renderer.setAttribute(form, 'action', response.redirectionUrl);
    // this.renderer.setStyle(form, 'display', 'none');

    // // Ajouter les champs cachés
    // const versionInput = this.renderer.createElement('input');
    // this.renderer.setAttribute(versionInput, 'type', 'hidden');
    // this.renderer.setAttribute(versionInput, 'name', 'redirectionVersion');
    // this.renderer.setProperty(versionInput, 'value', response.redirectionVersion);
    // this.renderer.appendChild(form, versionInput);

    // const dataInput = this.renderer.createElement('input');
    // this.renderer.setAttribute(dataInput, 'type', 'hidden');
    // this.renderer.setAttribute(dataInput, 'name', 'redirectionData');
    // this.renderer.setProperty(dataInput, 'value', response.redirectionData);
    // this.renderer.appendChild(form, dataInput);

    // // Ajouter le formulaire au DOM
    // this.renderer.appendChild(this.el.nativeElement, form);

    // // Soumettre le formulaire
    // form.submit();

    // // Supprimer le formulaire après soumission
    // this.renderer.removeChild(this.el.nativeElement, form);
  }
}
