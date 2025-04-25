import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractRibDialogComponent } from './rib-dialog.component';

describe('AppDocumentsContractRibDialogComponent', () => {
  let component: AppDocumentsContractRibDialogComponent;
  let fixture: ComponentFixture<AppDocumentsContractRibDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractRibDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractRibDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
