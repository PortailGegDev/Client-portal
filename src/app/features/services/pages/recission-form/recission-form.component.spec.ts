import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServicesRecissionFormComponent } from './recission-form.component';

describe('RecissionFormComponent', () => {
  let component: AppServicesRecissionFormComponent;
  let fixture: ComponentFixture<AppServicesRecissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppServicesRecissionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppServicesRecissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
