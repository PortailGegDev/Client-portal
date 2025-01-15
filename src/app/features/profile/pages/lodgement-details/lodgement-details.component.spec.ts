import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProfileLodgementDetailsComponent } from './lodgement-details.component';

describe('AppProfileLodgementDetailsComponent', () => {
  let component: AppProfileLodgementDetailsComponent;
  let fixture: ComponentFixture<AppProfileLodgementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProfileLodgementDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProfileLodgementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
