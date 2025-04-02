import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsMandatsComponent } from './mandats.component';

describe('AppDocumentsMandatsComponent', () => {
  let component: AppDocumentsMandatsComponent;
  let fixture: ComponentFixture<AppDocumentsMandatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsMandatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsMandatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
