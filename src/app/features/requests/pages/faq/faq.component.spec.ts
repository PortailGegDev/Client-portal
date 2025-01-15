import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsFaqComponent } from './faq.component';

describe('AppRequestsFaqComponent', () => {
  let component: AppRequestsFaqComponent;
  let fixture: ComponentFixture<AppRequestsFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRequestsFaqComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRequestsFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
