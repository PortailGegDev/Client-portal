import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AngularIbanModule, ValidatorService } from 'angular-iban';

@Component({
  selector: 'app-documents-contract-rib-dialog',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, AngularIbanModule],
  templateUrl: './rib-dialog.component.html',
  styleUrl: './rib-dialog.component.scss'
})
export class AppDocumentsContractRibDialogComponent {

  @Output() onCancelClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() inRibChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  newRib: any = '';
  payerName: string = '';
  form: FormGroup;

  get ibanForm(): any { return this.form.get('lastName'); }
  get titularForm(): any { return this.form.get('firstName'); }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      iban: ['', [Validators.required, ValidatorService.validateIban]],
      titular: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(value => {
      console.log(this.form)
    })
  }

  submitNewRib(): void {
    // if (this.newRib?.trim() && this.payerName?.trim()) {
    //   this.ribUpdated.emit({
    //     iban: this.newRib.trim(),
    //     AccountpayerName: this.payerName.trim()
    //   });

    //   this.showUpdateRibDialog = false;
    // } else {
    //   alert("L'IBAN et le nom du titulaire du compte sont obligatoires.");
    // }
  }
}
