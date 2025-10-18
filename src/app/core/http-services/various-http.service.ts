import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Carousel } from '../../shared/models/carousel.model';
import { Faq } from '../../shared/models/faq.model';
import { Article } from '../../shared/models/article.model';
import { Headline } from '../../shared/models/headline.model';
import { OptionVerte } from '../../shared/models/option-verte.model';

@Injectable({
  providedIn: 'root'
})
export class VariousHttpService {

  constructor(private http: HttpClient) { }

  fetchCarouselData(): Observable<Carousel[]> {
    return this.http.get<{ carousel: Carousel[] }>('/carousel-data.json').pipe(
      map(response => response.carousel || []), // Transforme la réponse pour ne renvoyer que les données nécessaires
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        // Retourne un tableau vide ou une valeur par défaut en cas d'erreur
        return of([]);
      })
    );
  }

  fetchFaqData(): Observable<Faq[]> {
    return this.http.get<{ faq: Faq[] }>('/faq-data.json').pipe(
      map(response => response.faq || []), // Transforme la réponse pour ne renvoyer que les données nécessaires
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        // Retourne un tableau vide ou une valeur par défaut en cas d'erreur
        return of([]);
      })
    );
  }
  
  fetchArticlesData(): Observable<Article[]> {
    return this.http.get<{ articles: Article[] }>('/articles-data.json').pipe(
      map(response => response.articles || []), // Transforme la réponse pour ne renvoyer que les données nécessaires
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        // Retourne un tableau vide ou une valeur par défaut en cas d'erreur
        return of([]);
      })
    );
  }

  fetchHeadlineData(): Observable<Headline[]> {
    return this.http.get<{ headlines: Headline[] }>('/headline-data.json').pipe(
      map(response => response.headlines || []), // Transforme la réponse pour ne renvoyer que les données nécessaires
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        // Retourne un tableau vide ou une valeur par défaut en cas d'erreur
        return of([]);
      })
    );
  }

  fetchOptionVerte(): Observable<OptionVerte[]> {
    return this.http.get<{ optionVertes: OptionVerte[] }>('/option-verte-data.json').pipe(
      map(response => response.optionVertes || []), // Transforme la réponse pour ne renvoyer que les données nécessaires
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        // Retourne un tableau vide ou une valeur par défaut en cas d'erreur
        return of([]);
      })
    );
  }

  fetchAssistanceDepannage(): Observable<OptionVerte[]> {
    return this.http.get<{ assistanceDepannage: OptionVerte[] }>('/assistance-depannage-data.json').pipe(
      map(response => response.assistanceDepannage || []), // Transforme la réponse pour ne renvoyer que les données nécessaires
      catchError(error => {
        console.error('Erreur lors de la requête:', error);
        // Retourne un tableau vide ou une valeur par défaut en cas d'erreur
        return of([]);
      })
    );
  }
}
