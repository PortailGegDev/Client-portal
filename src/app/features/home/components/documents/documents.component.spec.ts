import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomeDocumentsComponent } from './documents.component';

describe('AppHomeDocumentsComponent', () => {
  let component: AppHomeDocumentsComponent;
  let fixture: ComponentFixture<AppHomeDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHomeDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHomeDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
