import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsDocumentsListComponent } from './documents-list.component';

describe('AppDocumentsDocumentsListComponent', () => {
  let component: AppDocumentsDocumentsListComponent;
  let fixture: ComponentFixture<AppDocumentsDocumentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsDocumentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsDocumentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
