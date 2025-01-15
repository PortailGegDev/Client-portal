import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsRescissionComponent } from './rescission.component';

describe('AppRequestsRescissionComponent', () => {
  let component: AppRequestsRescissionComponent;
  let fixture: ComponentFixture<AppRequestsRescissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRequestsRescissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRequestsRescissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
