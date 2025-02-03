import { Injectable } from '@angular/core';
import { ProfilHttpService } from '../../core/http-services/profil-http.service';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture-model';
import { Profil } from '../models/profil.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private profilhttpService: ProfilHttpService) { }

  getProfil(bp: string): Observable<Profil[]> {
    return this.profilhttpService.fetchPerson(bp);
  }
  
}
