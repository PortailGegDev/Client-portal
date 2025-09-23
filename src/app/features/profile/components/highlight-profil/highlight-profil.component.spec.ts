import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppProfileHighlightProfilComponent } from './highlight-profil.component';

describe('AppProfileHighlightProfilComponent', () => {
  let component: AppProfileHighlightProfilComponent;
  let fixture: ComponentFixture<AppProfileHighlightProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppProfileHighlightProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppProfileHighlightProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
