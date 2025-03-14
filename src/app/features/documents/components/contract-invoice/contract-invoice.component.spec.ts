import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractInvoiceComponent } from './contract-invoice.component';

describe('AppDocumentsContractInvoiceComponent', () => {
  let component: AppDocumentsContractInvoiceComponent;
  let fixture: ComponentFixture<AppDocumentsContractInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
