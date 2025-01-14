import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenOptionComponent } from './green-option.component';

describe('GreenOptionComponent', () => {
  let component: GreenOptionComponent;
  let fixture: ComponentFixture<GreenOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreenOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreenOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
