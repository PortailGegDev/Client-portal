import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractBillingDateDialogComponent } from './billing-date-dialog.component';

describe('AppDocumentsContractBillingDateDialogComponent', () => {
  let component: AppDocumentsContractBillingDateDialogComponent;
  let fixture: ComponentFixture<AppDocumentsContractBillingDateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractBillingDateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractBillingDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
