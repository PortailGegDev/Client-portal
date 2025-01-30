import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInvoicesEstimateDialogComponent } from './estimate-dialog.component';

describe('AppInvoicesEstimateDialogComponent', () => {
  let component: AppInvoicesEstimateDialogComponent;
  let fixture: ComponentFixture<AppInvoicesEstimateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInvoicesEstimateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInvoicesEstimateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
