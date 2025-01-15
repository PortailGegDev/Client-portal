import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeminingComponent } from './demining-icon.component';

describe('DeminingComponent', () => {
  let component: DeminingComponent;
  let fixture: ComponentFixture<DeminingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeminingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeminingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
