import { Component, Input } from '@angular/core';
import { Profil } from '../../../../shared/models/profil.model';
import { Router } from '@angular/router';
import { ProfilService } from '../../../../shared/services/profil.service';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-mes-logements',
  imports: [PanelModule, ButtonModule],
  templateUrl: './mes-logements.component.html',
  styleUrl: './mes-logements.component.scss'
})
export class AppMesLogementsComponent {
  @Input() profil: Profil | undefined;


  constructor(private router: Router, private profileService: ProfilService) { }
  viewDetails() {
    this.router.navigate(['/profile/lodgement-details']);
  }

}
