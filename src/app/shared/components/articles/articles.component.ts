import { Component, OnInit, Input, input } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { VariousService } from '../../services/various.service';
import { Article } from '../../models/article.model';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-articles',
  imports: [PanelModule, CarouselModule, ButtonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  @Input() articleNumber = 3;
  @Input() screen: string = 'home';
  @Input() numScroll: number = 0;

  articles: Article[] = [];
  responsiveOptions: CarouselResponsiveOptions[] | undefined;

  constructor(private variousService: VariousService) { }

  ngOnInit() {
    this.initArticles();

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: this.articleNumber,
        numScroll: this.numScroll
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  initArticles() {
    this.variousService.getArticlesData().subscribe({
      next: (data: Article[]) => {

        this.articles = data.filter(item => item.screen === this.screen);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données d\'articles :', error);
      },
    });
  }
}
