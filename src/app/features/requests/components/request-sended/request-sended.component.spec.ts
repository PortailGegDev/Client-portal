import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsRequestSendedComponent } from './request-sended.component';

describe('AppRequestsRequestSendedComponent', () => {
  let component: AppRequestsRequestSendedComponent;
  let fixture: ComponentFixture<AppRequestsRequestSendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRequestsRequestSendedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRequestsRequestSendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
