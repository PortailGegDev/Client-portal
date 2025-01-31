import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsNewRequestComponent } from './new-request.component';

describe('AppRequestsNewRequestComponent', () => {
  let component: AppRequestsNewRequestComponent;
  let fixture: ComponentFixture<AppRequestsNewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRequestsNewRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRequestsNewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
