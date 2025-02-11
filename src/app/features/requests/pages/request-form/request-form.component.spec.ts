import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsFormComponent } from './request-form.component';

describe('AppRequestsFormComponent', () => {
  let component: AppRequestsFormComponent;
  let fixture: ComponentFixture<AppRequestsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRequestsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRequestsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
