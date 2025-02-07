import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsContractsListComponent } from './contracts-list.component';

describe('AppDocumentsContractsListComponent', () => {
  let component: AppDocumentsContractsListComponent;
  let fixture: ComponentFixture<AppDocumentsContractsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsContractsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsContractsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
