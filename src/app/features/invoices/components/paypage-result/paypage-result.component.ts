import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invoices-paypage-result',
  imports: [],
  templateUrl: './paypage-result.component.html',
  styleUrl: './paypage-result.component.scss'
})
export class AppInvoicesPaypageResultComponent implements OnInit {

  orderId: string = '';


  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(){
    this.activatedRoute.params.pipe().subscribe(params => {
      this.orderId = params['invoiceNumber'];
    });
  }
}
