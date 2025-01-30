import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConsumptionActivationComponent } from './activation.component';

describe('AppConsumptionActivationComponent', () => {
  let component: AppConsumptionActivationComponent;
  let fixture: ComponentFixture<AppConsumptionActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppConsumptionActivationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppConsumptionActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
