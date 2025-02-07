import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMesLogementsComponent } from './mes-logements.component';

describe('AppMesLogementsComponent', () => {
  let component: AppMesLogementsComponent;
  let fixture: ComponentFixture<AppMesLogementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMesLogementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMesLogementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
