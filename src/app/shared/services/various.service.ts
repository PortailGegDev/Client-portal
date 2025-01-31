import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carousel } from '../models/carousel.model';
import { VariousHttpService } from '../../core/http-services/various-http.service';
import { Faq } from '../models/faq.model';
import { Article } from '../models/article.model';
import { Headline } from '../models/headline.model';

@Injectable({
  providedIn: 'root'
})
export class VariousService {

  articles: Article[] = [];

  constructor(private variousHttpService: VariousHttpService) { }

  getCarouselData(): Observable<Carousel[]> {
    return this.variousHttpService.fetchCarouselData();
  }

  getFaqData(): Observable<Faq[]> {
    return this.variousHttpService.fetchFaqData();
  }

  getArticlesData(): Observable<Article[]> {
    return this.variousHttpService.fetchArticlesData();
  }

  getHeadlineData(): Observable<Headline[]> {
    return this.variousHttpService.fetchHeadlineData();
  }
}
