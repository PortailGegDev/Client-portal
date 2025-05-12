import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractPaymentMethodeDialogComponent } from './payment-methode-dialog.component';

describe('AppDocumentsContractPaymentMethodeDialogComponent', () => {
  let component: AppDocumentsContractPaymentMethodeDialogComponent;
  let fixture: ComponentFixture<AppDocumentsContractPaymentMethodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractPaymentMethodeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractPaymentMethodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
