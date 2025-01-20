import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveContractComponent } from './active-contract.component';

describe('ActiveContractComponent', () => {
  let component: ActiveContractComponent;
  let fixture: ComponentFixture<ActiveContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
