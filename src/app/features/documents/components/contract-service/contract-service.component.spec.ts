import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractServiceComponent } from './contract-service.component';

describe('ContractServiceComponent', () => {
  let component: AppDocumentsContractServiceComponent;
  let fixture: ComponentFixture<AppDocumentsContractServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
