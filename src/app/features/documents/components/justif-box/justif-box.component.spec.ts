import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsJustifBoxComponent } from './justif-box.component';

describe('AppDocumentsJustifBoxComponent', () => {
  let component: AppDocumentsJustifBoxComponent;
  let fixture: ComponentFixture<AppDocumentsJustifBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsJustifBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsJustifBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
