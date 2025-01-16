import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';

interface FAQ {
  question: string;
  answer: string;
  isOpen: boolean;
}
@Component({
  selector: 'app-requests-faq',
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class AppRequestsFaqComponent {
  faqs: FAQ[] = [];  // Typé correctement avec l'interface FAQ
  constructor(private http: HttpClient) { } // Injecter HttpClient
  ngOnInit() {
    this.loadFAQs();
  }
  loadFAQs() {
    this.http.get<{ faq: FAQ[] }>('/assets/faq-data.json').subscribe({
      next: (data) => {
        this.faqs = data.faq; // Assigner directement les FAQs depuis le fichier JSON
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données FAQ :', error);
      },
      complete: () => {
        console.log('Chargement des FAQs terminé');
      }
    });
  }
  
  
  toggleDropdown(faq: FAQ, event: MouseEvent) {
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
