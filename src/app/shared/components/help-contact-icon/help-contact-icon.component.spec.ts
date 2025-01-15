import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpContactIconComponent } from './help-contact-icon.component';

describe('HelpContactIconComponent', () => {
  let component: HelpContactIconComponent;
  let fixture: ComponentFixture<HelpContactIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpContactIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpContactIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
