import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsJustificatifsComponent } from './justificatifs.component';

describe('AppDocumentsJustificatifsComponent', () => {
  let component: AppDocumentsJustificatifsComponent;
  let fixture: ComponentFixture<AppDocumentsJustificatifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsJustificatifsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsJustificatifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
