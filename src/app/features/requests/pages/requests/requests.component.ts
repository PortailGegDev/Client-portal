import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProfilService } from '../../../../shared/services/profil.service';
import { RequestService } from '../../../../shared/services/request.service';
import { FormsModule } from '@angular/forms';
import { RequestRead } from '../../../../shared/models/request-rescission-read.model';
import { DatePickerModule } from 'primeng/datepicker';
import { PrimeNgLocaleService } from '../../../../shared/services/prime-ng-locale.service';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-requests',
  imports: [CommonModule, TableModule, ButtonModule, FormsModule, DatePickerModule,DropdownModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class AppRequestsComponent implements OnInit {
  demandes: RequestRead[] = [];
  contactId: string | null = null;
  loading = false;
  fr: any;
  rangeDates: Date[] | null = null;
  filteredDemandes: RequestRead[] = [];
selectedType: string | null = null;


  constructor(private router: Router, private requestService: RequestService, private primenNgLocaleService: PrimeNgLocaleService,
    private profilService: ProfilService) { this.fr = this.primenNgLocaleService.getFrenchLocale() }

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
    if (!this.contactId) return;
    this.loading = true;
    // Premier appel
    this.requestService.getRescissionRequests(this.contactId!).subscribe(rescissionData => {
      // On stocke les résultats du premier appel
      const allRequests = [...rescissionData];

      // Deuxième appel
      this.requestService.getReclamationRequests(this.contactId!).subscribe(reclamationData => {
        // On ajoute les résultats du deuxième appel
        allRequests.push(...reclamationData);
        // Instanciation pour getters
        this.demandes = allRequests.map(d => new RequestRead(d));
        // <-- Ici, on initialise filteredDemandes pour afficher toutes les demandes avant filtrage
        this.filteredDemandes = [...this.demandes];

        this.loading = false;
        console.log('Toutes les demandes récupérées :', this.demandes);
      });
    });
  }

  applyFilters() {
    this.filteredDemandes = this.demandes.filter(d => {
      // Filtre type
      let typeMatch = true;
      if (this.selectedType) {
        const type = d.typeDemande?.toLowerCase() ?? '';
        const selected = this.selectedType.toLowerCase();
        typeMatch = type.includes(selected);
      }

      // Filtre date
      let dateMatch = true;
      if (this.rangeDates?.length === 2) {
        const [start, end] = this.rangeDates;
        const created = new Date(d.createdDate);
        dateMatch = created >= start && created <= end;
      }

      return typeMatch && dateMatch;
    });
  }

  onTypeChange() {
    this.applyFilters();
  }

    onSelectDateRange() {
    if (this.rangeDates && this.rangeDates.length === 2) {
      const [start, end] = this.rangeDates;
      this.filteredDemandes = this.demandes.filter(d => {
        const created = new Date(d.createdDate);
        return created >= start && created <= end;
      });
    } else {
      this.filteredDemandes = [...this.demandes];
      this.applyFilters();

    }
  }

  onClearDateRange() {
    this.rangeDates = null;
    this.filteredDemandes = [...this.demandes];
    this.applyFilters();

  }

  view() {
    this.router.navigate(['/requests/rescission']);
  }
  viewCreateDemande() {
    this.router.navigate(['/requests/new']);
  }
}
