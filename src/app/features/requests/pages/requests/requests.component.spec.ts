import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsComponent } from './requests.component';

describe('AppRequestsComponent', () => {
  let component: AppRequestsComponent;
  let fixture: ComponentFixture<AppRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
