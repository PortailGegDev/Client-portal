import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-invoices-estimate-dialog',
  imports: [ButtonModule, InputOtpModule, FormsModule],
  templateUrl: './estimate-dialog.component.html',
  styleUrl: './estimate-dialog.component.scss'
})
export class AppInvoicesEstimateDialogComponent {

  hpValue:any;
  hcValue:any;
}
