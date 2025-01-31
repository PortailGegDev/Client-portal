import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProfileDetailsComponent } from './profile-details.component';

describe('AppProfileDetailsComponent', () => {
  let component: AppProfileDetailsComponent;
  let fixture: ComponentFixture<AppProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProfileDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
