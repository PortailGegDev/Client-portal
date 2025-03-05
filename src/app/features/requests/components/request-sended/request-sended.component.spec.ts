import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSendedComponent } from './request-sended.component';

describe('RequestSendedComponent', () => {
  let component: RequestSendedComponent;
  let fixture: ComponentFixture<RequestSendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestSendedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
