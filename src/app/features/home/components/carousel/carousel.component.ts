import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { VariousService } from '../../../../shared/services/various.service';
import { Carousel } from '../../../../shared/models/carousel.model';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home-carousel',
  imports: [PanelModule, CardModule,CarouselModule, ButtonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class AppHomeCarouselComponent implements OnInit {
  carouselData: Carousel[] = [];

  responsiveOptions: any[] | undefined;

  constructor(private variousService: VariousService) { }

  ngOnInit() {
    this.initCarouselData();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ];
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
