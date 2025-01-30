import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInvoicesEnergyCheckComponent } from './energy-check.component';

describe('AppInvoicesEnergyCheckComponent', () => {
  let component: AppInvoicesEnergyCheckComponent;
  let fixture: ComponentFixture<AppInvoicesEnergyCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInvoicesEnergyCheckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInvoicesEnergyCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
