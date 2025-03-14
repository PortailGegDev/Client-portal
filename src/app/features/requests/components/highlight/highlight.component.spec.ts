import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestsHighlightComponent } from './highlight.component';

describe('AppRequestsHighlightComponent', () => {
  let component: AppRequestsHighlightComponent;
  let fixture: ComponentFixture<AppRequestsHighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRequestsHighlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRequestsHighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
