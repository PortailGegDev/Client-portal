import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConsumptionComponent } from './consumption.component';

describe('AppConsumptionComponent', () => {
  let component: AppConsumptionComponent;
  let fixture: ComponentFixture<AppConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppConsumptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
