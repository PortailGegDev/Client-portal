import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInvoicesPaypageComponent } from './paypage.component';

describe('AppInvoicesPaypageComponent', () => {
  let component: v;
  let fixture: ComponentFixture<AppInvoicesPaypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInvoicesPaypageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInvoicesPaypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
