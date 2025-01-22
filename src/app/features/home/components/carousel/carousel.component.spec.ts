import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHomeCarouselComponent } from './carousel.component';

describe('AppHomeCarouselComponent', () => {
  let component: AppHomeCarouselComponent;
  let fixture: ComponentFixture<AppHomeCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHomeCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHomeCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
