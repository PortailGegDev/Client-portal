import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { VariousService } from '../../../../shared/services/various.service';
import { Carousel } from '../../../../shared/models/carousel.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-carousel',
  imports: [CardModule,CarouselModule, ButtonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class AppHomeCarouselComponent implements OnInit {
  carouselData: Carousel[] = [];

  constructor(private variousService: VariousService) { }

  ngOnInit() {
    this.initCarouselData();
  }

  initCarouselData() {
    this.variousService.getCarouselData().subscribe({
      next: (data: Carousel[]) => {
        this.carouselData = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données de carousel :', error);
      },
    });
  }
}
