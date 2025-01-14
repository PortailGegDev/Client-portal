import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerenityElectricityComponent } from './serenity-electricity.component';

describe('SerenityElectricityComponent', () => {
  let component: SerenityElectricityComponent;
  let fixture: ComponentFixture<SerenityElectricityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerenityElectricityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerenityElectricityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
