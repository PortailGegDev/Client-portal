import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractDocumentComponent } from './contract-document.component';

describe('AppDocumentsContractDocumentComponent', () => {
  let component: AppDocumentsContractDocumentComponent;
  let fixture: ComponentFixture<AppDocumentsContractDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
