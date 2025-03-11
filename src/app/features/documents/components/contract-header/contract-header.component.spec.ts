import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractHeaderComponent } from './contract-header.component';

describe('ContractHeaderComponent', () => {
  let component: AppDocumentsContractHeaderComponent;
  let fixture: ComponentFixture<AppDocumentsContractHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
