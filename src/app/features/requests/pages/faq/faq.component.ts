import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Faq } from '../../../../shared/models/faq.model';
import { VariousService } from '../../../../shared/services/various.service';


@Component({
  selector: 'app-requests-faq',
  imports: [CommonModule],
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


  toggleDropdown(faq: Faq, event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Si le clic provient d'un lien, empêche la propagation pour ne pas fermer la réponse
    if (target.tagName.toLowerCase() === 'a') {
      event.stopPropagation();
    } else {
      // Alterne l'état d'ouverture seulement si faq.isOpen est false ou pour l'ouvrir
      faq.isOpen = !faq.isOpen || !faq.isOpen;
    }
  }
}
