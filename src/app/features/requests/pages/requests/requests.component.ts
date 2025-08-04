import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RequestRecissionRead } from '../../../../shared/models/request-rescission-read.model';
import { ProfilService } from '../../../../shared/services/profil.service';
import { RequestService } from '../../../../shared/services/request.service';
import { finalize } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-requests',
  imports: [CommonModule,TableModule,ButtonModule,FormsModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class AppRequestsComponent implements OnInit{
  demandes: RequestRecissionRead[] = [];
  contactId: string | null = null;
  loading = false; 

  constructor(private router: Router, private requestService: RequestService,
    private profilService: ProfilService){}

  ngOnInit(): void {
    // Récupération dynamique du contactId
    this.profilService.contactId$.subscribe(id => {
      this.contactId = id;

      if (id) {
        this.loadRequests(); // charger les demandes une fois le contactId disponible
      }
    });
  }

  loadRequests(): void {
    this.loading = true;
    this.requestService.getRescissionRequests(this.contactId!)
    .pipe(
      finalize(() => this.loading = false) // Stoppe le chargement à la fin, succès ou erreur
    )
      .subscribe(data => {
        // on instancie les objets pour bénéficier des getters (statusClass, statusIcon)
        this.demandes = data.map((d: RequestRecissionRead) => new RequestRecissionRead(d))
        console.log('Demandes récupérées :', this.demandes);
      });
  }

  view() {
    this.router.navigate(['/requests/rescission']);
  }
  viewCreateDemande() {
    this.router.navigate(['/requests/new']);
  }
}
