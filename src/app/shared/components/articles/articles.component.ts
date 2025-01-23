import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { VariousService } from '../../services/various.service';
import { Article } from '../../models/article.model';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-articles',
  imports: [PanelModule, CarouselModule, ButtonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {
  articles: Article[] = [];
  responsiveOptions: any[] | undefined;

  constructor(private variousService: VariousService) { }

  ngOnInit() {
    this.initArticles();

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

  initArticles() {
    this.variousService.getArticlesData().subscribe({
      next: (data: Article[]) => {
        this.articles = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données d\'articles :', error);
      },
    });
  }
}
