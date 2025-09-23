import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDocumentsCGVBoxComponent } from './cgv-box.component';

describe('CGVBoxComponent', () => {
  let component: AppDocumentsCGVBoxComponent;
  let fixture: ComponentFixture<AppDocumentsCGVBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDocumentsCGVBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDocumentsCGVBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
