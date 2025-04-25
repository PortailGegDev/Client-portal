import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractBillingAddressDialogComponent } from './billing-address-dialog.component';

describe('AppDocumentsContractBillingAddressDialogComponent', () => {
  let component: AppDocumentsContractBillingAddressDialogComponent;
  let fixture: ComponentFixture<AppDocumentsContractBillingAddressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractBillingAddressDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractBillingAddressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
