import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServicesSerenityElectricityComponent } from './serenity-electricity.component';

describe('AppServicesSerenityElectricityComponent', () => {
  let component: AppServicesSerenityElectricityComponent;
  let fixture: ComponentFixture<AppServicesSerenityElectricityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppServicesSerenityElectricityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppServicesSerenityElectricityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
