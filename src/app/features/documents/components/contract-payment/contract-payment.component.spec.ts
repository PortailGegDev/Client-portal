import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractPaymentComponent } from './contract-payment.component';

describe('ContractPaymentComponent', () => {
  let component: AppDocumentsContractPaymentComponent;
  let fixture: ComponentFixture<AppDocumentsContractPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
