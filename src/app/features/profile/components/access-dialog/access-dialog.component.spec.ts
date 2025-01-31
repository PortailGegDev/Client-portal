import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProfileAccessDialogComponent } from './access-dialog.component';

describe('AppProfileAccessDialogComponent', () => {
  let component: AppProfileAccessDialogComponent;
  let fixture: ComponentFixture<AppProfileAccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProfileAccessDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProfileAccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
