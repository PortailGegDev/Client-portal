import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Faq } from '../../../../shared/models/faq.model';
import { VariousService } from '../../../../shared/services/various.service';
import { AppRequestsHighlightComponent } from '../../components/highlight/highlight.component';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-requests-faq',
  imports: [CommonModule, AccordionModule, AppRequestsHighlightComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class AppRequestsFaqComponent {
  faqs: Faq[] = [];

  constructor(private variousService: VariousService) { }

  ngOnInit() {
    this.loadFAQs();
  }

  loadFAQs() {
    this.variousService.getFaqData().subscribe({
      next: (data: Faq[]) => {
        this.faqs = data;
      },
      error(error) {
        console.error('Erreur lors du chargement des données de FAQ :', error);
      },
    });
  }
}