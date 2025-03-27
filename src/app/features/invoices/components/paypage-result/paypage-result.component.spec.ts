import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypageResultComponent } from './paypage-result.component';

describe('AppInvoicesPaypageResultComponent', () => {
  let component: AppInvoicesPaypageResultComponent;
  let fixture: ComponentFixture<AppInvoicesPaypageResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInvoicesPaypageResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppInvoicesPaypageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
