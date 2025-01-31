import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServicesGreenOptionComponent } from './green-option.component';

describe('AppServicesGreenOptionComponent', () => {
  let component: AppServicesGreenOptionComponent;
  let fixture: ComponentFixture<AppServicesGreenOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppServicesGreenOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppServicesGreenOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
