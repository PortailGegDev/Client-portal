import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomeConsumptionComponent } from './consumption.component';

describe('AppHomeConsumptionComponent', () => {
  let component: AppHomeConsumptionComponent;
  let fixture: ComponentFixture<AppHomeConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHomeConsumptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHomeConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
