import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConsumptionActivationDialogComponent } from './activation-dialog.component';

describe('AppConsumptionActivationDialogComponent', () => {
  let component: AppConsumptionActivationDialogComponent;
  let fixture: ComponentFixture<AppConsumptionActivationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppConsumptionActivationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppConsumptionActivationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
