import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractsComponent } from './contracts.component';

describe('AppDocumentsContractsComponent', () => {
  let component: AppDocumentsContractsComponent;
  let fixture: ComponentFixture<AppDocumentsContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
