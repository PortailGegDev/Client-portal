import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMesPreferencesComponent } from './mes-preferences.component';

describe('AppMesPreferencesComponent', () => {
  let component: AppMesPreferencesComponent;
  let fixture: ComponentFixture<AppMesPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMesPreferencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMesPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
