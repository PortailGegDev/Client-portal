import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { Headline } from '../../models/headline.model';
import { VariousService } from '../../services/various.service';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-headline',
  imports: [CommonModule, PanelModule, CarouselModule, ButtonModule],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent implements OnInit, OnChanges {
  @Input() isConsumptionPage: boolean = false;
  headlines: Headline[] = [];
  responsiveOptions: any[] | undefined;

  constructor(private variousService: VariousService,
    private router: Router) { }

  ngOnInit() {
    this.initHeadlines();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnChanges() {
    this.initHeadlines();
  }

  initHeadlines() {
    this.variousService.getHeadlineData().subscribe({
      next: (data: Headline[]) => {

        if (this.isConsumptionPage) {
          this.headlines = data.filter(item => item.icon === 'Eco-geste');
        } else {
          this.headlines = data.filter(item => item.icon === 'Service');
        }

      },
      error: (error) => {
        console.error('Erreur lors du chargement des données d\'à la une :', error);
      },
    });
  }


  navigateToService() {
    this.router.navigate(["/services"]);
  }
}
