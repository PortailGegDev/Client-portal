import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConsumptionChartComponent } from './chart.component';

describe('AppConsumptionChartComponent', () => {
  let component: AppConsumptionChartComponent;
  let fixture: ComponentFixture<AppConsumptionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppConsumptionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppConsumptionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
